import {
  getCatalog,
  getIssueById,
  buildSpeechQueue,
  exportIssueMarkdown,
  verifyLicenseToken,
} from "./brief-engine.js";

const STORAGE_KEY = "opc_license_silicon_brief_v1";

const state = {
  selectedId: "issue-01",
  query: "",
  isPro: false,
  speechMode: "bilingual",
  speechRate: 1.0,
  isSpeaking: false,
};

const els = {
  searchInput: document.getElementById("searchInput"),
  issueList: document.getElementById("issueList"),
  readerPane: document.getElementById("readerPane"),
  licenseInput: document.getElementById("licenseInput"),
  activateBtn: document.getElementById("activateBtn"),
  licenseStatus: document.getElementById("licenseStatus"),
  proTopStatus: document.getElementById("proTopStatus"),
};

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  state.isSpeaking = false;
  const statusEl = document.getElementById("audioLiveLabel");
  if (statusEl) statusEl.textContent = "🎧 双语播客听读就绪";
}

function startSpeech(issueId) {
  if (!("speechSynthesis" in window)) {
    const statusEl = document.getElementById("audioLiveLabel");
    if (statusEl) statusEl.textContent = "当前浏览器不支持 Web Speech API 语音合成";
    return;
  }

  window.speechSynthesis.cancel();
  const queue = buildSpeechQueue(issueId, { mode: state.speechMode, isPro: state.isPro });
  if (!queue.length) return;

  state.isSpeaking = true;
  let idx = 0;

  const speakNext = () => {
    if (!state.isSpeaking || idx >= queue.length) {
      state.isSpeaking = false;
      const statusEl = document.getElementById("audioLiveLabel");
      if (statusEl) statusEl.textContent = "✅ 本期听读播放完毕";
      return;
    }

    const seg = queue[idx];
    idx += 1;
    const utter = new SpeechSynthesisUtterance(seg.text);
    utter.lang = seg.lang;
    utter.rate = state.speechRate;

    const statusEl = document.getElementById("audioLiveLabel");
    if (statusEl) {
      statusEl.textContent = `🔊 正在播报 (${state.speechRate}x)：${seg.label}`;
    }

    utter.onend = () => speakNext();
    utter.onerror = () => {
      state.isSpeaking = false;
    };
    window.speechSynthesis.speak(utter);
  };

  speakNext();
}

function badgeClassFor(issue) {
  if (issue.access === "free") return "badge-free";
  if (issue.access === "summary_free") return "badge-summary";
  return "badge-pro";
}

function renderSidebar() {
  const catalog = getCatalog({ query: state.query, isPro: state.isPro });

  if (catalog.length === 0) {
    els.issueList.innerHTML = `
      <div style="padding:1rem;color:#94a3b8;font-size:0.88rem;border:1px dashed #1e293b;border-radius:10px;">
        未检索到匹配「${escapeHtml(state.query)}」的刊物，请尝试搜索 <code>Token</code>、<code>GEO</code>、<code>买断</code> 或 <code>端侧</code>。
      </div>
    `;
    return;
  }

  if (!catalog.some((i) => i.id === state.selectedId)) {
    state.selectedId = catalog[0].id;
  }

  els.issueList.innerHTML = catalog
    .map(
      (item) => `
      <button type="button" class="issue-card ${item.id === state.selectedId ? "active" : ""}" data-issue="${item.id}">
        <span class="issue-badge ${badgeClassFor(item)}">
          ${item.unlocked ? "✅ 已开放" : "🔒"} Issue #${item.number} · ${escapeHtml(item.accessBadgeZh)}
        </span>
        <div style="font-weight:700;font-size:0.95rem;margin-bottom:0.3rem;line-height:1.4;">
          ${escapeHtml(item.zhTitle)}
        </div>
        <div style="font-size:0.78rem;color:#94a3b8;line-height:1.35;">
          ${escapeHtml(item.enTitle)}
        </div>
      </button>
    `
    )
    .join("");

  els.issueList.querySelectorAll("[data-issue]").forEach((btn) => {
    btn.addEventListener("click", () => {
      stopSpeech();
      state.selectedId = btn.dataset.issue;
      renderAll();
    });
  });
}

function renderReader() {
  const issue = getIssueById(state.selectedId, { isPro: state.isPro });

  const infographicHtml = issue.infographicUrl
    ? `
      <div class="infographic-box">
        <img src="${escapeHtml(issue.infographicUrl)}" alt="Issue #${issue.number} Executive Infographic" loading="eager" />
        <div class="infographic-caption">
          <span>📊 首刊高管一图流拆解卡片（1600×1080 高清无水印 PNG）</span>
          <a href="${escapeHtml(issue.infographicUrl)}" download="silicon-brief-issue-01-infographic.png" class="btn" style="text-decoration:none;">⬇️ 下载高清信息图</a>
        </div>
      </div>
    `
    : "";

  const tableHtml = issue.metricsTable
    ? `
      <h3 style="margin:1.5rem 0 0.6rem;font-size:1.12rem;">📈 ${escapeHtml(issue.metricsTable.captionZh)}</h3>
      <div class="metrics-wrap">
        <table class="metrics">
          <thead>
            <tr>${issue.metricsTable.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${issue.metricsTable.rows
              .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
              .join("")}
          </tbody>
        </table>
      </div>
      ${
        issue.metricsTable.truncatedCount
          ? `<div style="font-size:0.82rem;color:#fbbf24;margin-top:-0.8rem;margin-bottom:1rem;">🔒 另有 ${issue.metricsTable.truncatedCount} 行核心财务/ROI 实测基准在 Pro 订阅版中完整呈现</div>`
          : ""
      }
    `
    : "";

  const moatHtml =
    issue.moatAnalysis && issue.moatAnalysis.length > 0
      ? `
      <h3 style="margin:1.5rem 0 0.7rem;font-size:1.12rem;">🏰 商业护城河与底层算力拆解 (Moat Teardown)</h3>
      ${issue.moatAnalysis
        .map(
          (m) => `
        <div class="moat-card">
          <h4>${escapeHtml(m.zhHeading)}</h4>
          <div class="moat-en-sub">${escapeHtml(m.enHeading)}</div>
          <div style="font-size:0.92rem;">${escapeHtml(m.zhBody)}</div>
          <div class="en-quote">${escapeHtml(m.enBody)}</div>
        </div>
      `
        )
        .join("")}
    `
      : "";

  const playbookHtml =
    issue.opcPlaybook && issue.opcPlaybook.length > 0
      ? `
      <h3 style="margin:1.5rem 0 0.7rem;font-size:1.12rem;">🧭 对一人公司 / 独立开发者的可执行启示 (Actionable Playbook)</h3>
      <div style="display:grid;gap:0.7rem;">
        ${issue.opcPlaybook
          .map(
            (p, idx) => `
          <div class="moat-card" style="border-color:#1e3a5f;">
            <div style="font-weight:700;color:#38bdf8;">0${idx + 1} · ${escapeHtml(p.titleZh)}</div>
            <div style="font-size:0.78rem;color:#94a3b8;margin-bottom:0.35rem;">${escapeHtml(p.titleEn)}</div>
            <div style="font-size:0.9rem;">${escapeHtml(p.detailZh)}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `
      : "";

  const quotesHtml =
    issue.bilingualQuotes && issue.bilingualQuotes.length > 0
      ? `
      <h3 style="margin:1.5rem 0 0.7rem;font-size:1.12rem;">💬 中英对照高管金句 (Executive Quotes)</h3>
      <div style="display:grid;gap:0.65rem;">
        ${issue.bilingualQuotes
          .map(
            (q) => `
          <div class="moat-card">
            <div style="font-weight:700;color:#38bdf8;font-size:0.94rem;">“${escapeHtml(q.en)}”</div>
            <div style="font-size:0.9rem;margin-top:0.3rem;">「${escapeHtml(q.zh)}」</div>
            <div style="font-size:0.76rem;color:#64748b;margin-top:0.2rem;">— ${escapeHtml(q.source)}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `
      : "";

  const paywallHtml = !issue.unlocked
    ? `
      <div class="paywall-box">
        <h3 style="margin:0 0 0.45rem;color:#38bdf8;font-size:1.15rem;">
          🔒 解锁第 #${issue.number} 期完整双语拆解 + 全站 Pro 深度刊库（¥29/季 · $9/quarter）
        </h3>
        <p style="margin:0 0 0.85rem;font-size:0.9rem;color:#cbd5e1;">
          订阅即刻解锁全部 4 期及本季持续更新的硅谷 AI 财报算力拆解、完整 ROI 对比矩阵、一人公司套利手册、双语播客全文听读与一键 Markdown 知识库导出。
        </p>
        <a href="#subscribeSection" class="btn btn-primary" style="text-decoration:none;display:inline-block;">输入 OPC1 激活码立即解锁 →</a>
      </div>
    `
    : "";

  els.readerPane.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem;">
      <span class="issue-badge ${badgeClassFor(issue)}">ISSUE #${issue.number} · ${escapeHtml(issue.publishedAt)} · ${issue.readingMinutes} 分钟精读</span>
      <button type="button" class="btn" id="exportMdBtn">
        ${issue.unlocked ? "⬇️ 导出本期双语 Markdown" : "🔒 Markdown 导出 (Pro)"}
      </button>
    </div>

    <h2 style="margin:0 0 0.35rem;font-size:1.55rem;line-height:1.3;">${escapeHtml(issue.zhTitle)}</h2>
    <div style="color:#94a3b8;font-size:0.98rem;margin-bottom:1rem;">${escapeHtml(issue.enTitle)}</div>

    <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1rem;">
      ${issue.tags.map((t) => `<span style="font-size:0.75rem;background:#142038;color:#7dd3fc;padding:0.15rem 0.55rem;border-radius:6px;">#${escapeHtml(t)}</span>`).join("")}
    </div>

    <!-- Native Web Speech API Podcast Bar -->
    <div class="audio-bar">
      <div style="display:flex;flex-wrap:wrap;gap:0.45rem;align-items:center;">
        <button type="button" class="btn btn-primary" id="playSpeechBtn">▶️ 一键播客听读</button>
        <button type="button" class="btn" id="stopSpeechBtn">⏹ 停止</button>
        <select id="speechModeSelect" class="btn" aria-label="听读语言模式">
          <option value="bilingual" ${state.speechMode === "bilingual" ? "selected" : ""}>中英双语交替</option>
          <option value="zh" ${state.speechMode === "zh" ? "selected" : ""}>纯中文精讲</option>
          <option value="en" ${state.speechMode === "en" ? "selected" : ""}>English Briefing</option>
        </select>
        <div style="display:inline-flex;gap:0.25rem;" role="group" aria-label="语速调节">
          ${[1, 1.25, 1.5]
            .map(
              (r) => `<button type="button" class="btn ${state.speechRate === r ? "active" : ""}" data-rate="${r}">${r}x</button>`
            )
            .join("")}
        </div>
      </div>
      <div id="audioLiveLabel" style="font-size:0.8rem;color:#7dd3fc;">🎧 双语播客听读就绪</div>
    </div>

    <div class="moat-card" style="border-color:#1e3a5f;">
      <div style="font-weight:700;margin-bottom:0.35rem;color:#f8fafc;">【3 分钟高管核心摘要 · Executive Summary】</div>
      <p style="margin:0 0 0.55rem;font-size:0.94rem;">${escapeHtml(issue.zhSummary)}</p>
      <p style="margin:0;font-size:0.88rem;color:#94a3b8;">${escapeHtml(issue.enSummary)}</p>
    </div>

    ${infographicHtml}
    ${tableHtml}
    ${moatHtml}
    ${playbookHtml}
    ${quotesHtml}
    ${paywallHtml}
  `;

  document.getElementById("playSpeechBtn")?.addEventListener("click", () => startSpeech(issue.id));
  document.getElementById("stopSpeechBtn")?.addEventListener("click", () => stopSpeech());
  document.getElementById("speechModeSelect")?.addEventListener("change", (e) => {
    state.speechMode = e.target.value;
    if (state.isSpeaking) startSpeech(issue.id);
  });

  els.readerPane.querySelectorAll("[data-rate]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.speechRate = parseFloat(btn.dataset.rate);
      renderReader();
      if (state.isSpeaking) startSpeech(issue.id);
    });
  });

  document.getElementById("exportMdBtn")?.addEventListener("click", () => {
    const res = exportIssueMarkdown(issue.id, { isPro: state.isPro });
    if (!res.allowed) {
      document.getElementById("subscribeSection")?.scrollIntoView({ behavior: "smooth" });
      els.licenseInput?.focus();
      return;
    }
    const blob = new Blob([res.markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = res.filename;
    a.click();
    URL.revokeObjectURL(url);
  });
}

function renderAll() {
  renderSidebar();
  renderReader();
}

async function tryActivate(tokenStr, silent = false) {
  const res = await verifyLicenseToken(tokenStr);
  if (res.valid) {
    state.isPro = true;
    localStorage.setItem(STORAGE_KEY, tokenStr.trim());
    els.proTopStatus.textContent = "PRO 会员已激活 · 全刊解锁";
    els.proTopStatus.style.color = "#34d399";
    els.licenseStatus.style.color = "#34d399";
    els.licenseStatus.textContent = `✅ 欢迎回来！OPC1 授权验证通过（${res.payload.e || res.payload.plan || "silicon-brief"}），全部 Pro 深度刊物与 Markdown 导出已解锁。`;
    renderAll();
  } else if (!silent) {
    els.licenseStatus.style.color = "#fb7185";
    els.licenseStatus.textContent = `❌ 激活码验证未通过：${res.message || res.reason}`;
  }
}

els.searchInput.addEventListener("input", (e) => {
  state.query = e.target.value;
  renderSidebar();
  renderReader();
});

els.activateBtn.addEventListener("click", () => {
  tryActivate(els.licenseInput.value, false);
});

const cachedToken = localStorage.getItem(STORAGE_KEY);
if (cachedToken) {
  els.licenseInput.value = cachedToken;
  tryActivate(cachedToken, true);
}

renderAll();
