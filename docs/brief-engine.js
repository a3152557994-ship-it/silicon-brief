/**
 * Silicon Brief (silicon-brief) — Structured Bilingual AI Earnings & Paper Teardown Engine.
 * Isomorphic pure ESM module (Node.js + Modern Browsers). Zero external dependencies.
 */

export const PUBLIC_SPKI_BASE64 = "MCowBQYDK2VwAyEAP5NCVP7CT0tgaGLSGMe4r87SjYRWTM6gN6igBZYSXys=";
export const PRODUCT_SLUG = "silicon-brief";

export const ISSUES = [
  {
    id: "issue-01",
    number: "01",
    publishedAt: "2026-11-01",
    readingMinutes: 3,
    access: "free",
    accessBadgeZh: "首刊免费开放 · 标杆拆解",
    accessBadgeEn: "Free Flagship Issue",
    infographicUrl: "./assets/issue-01-infographic.png",
    tags: ["AI Coding Agents", "Token Economics", "Gross Margin", "Prompt Caching", "OPC Arbitrage"],
    zhTitle: "AI Coding Agents 商业经济学拆解：Token 成本曲线、毛利陷阱与工具层套利机会",
    enTitle: "The Unit Economics of AI Coding Agents: Token Cost Curves, Gross Margin Traps & Tool-Layer Arbitrage",
    zhSummary:
      "当 Cursor、Claude Code 与各类 $20/月包月 Agent 席卷开发者市场时，重度用户单月推理账单高达 $65–$140，令纯大模型转售壳层陷入 -180% 负毛利泥潭。本刊基于前沿推理定价曲线、KV-Cache 命中率与企业财报披露，拆解「包月亏损陷阱」背后的真实算力账本，并指明一人公司（OPC）在确定性工具层的 90%+ 高毛利套利切口。",
    enSummary:
      "As $20/month flat-rate AI coding subscriptions scale, top-decile power users routinely burn $65–$140/month in frontier reasoning tokens—pushing thin wrapper startups into negative gross margins. We dissect KV-cache economics, multi-file agent retry loops, and where solo builders capture 90%+ gross margins.",
    metricsTable: {
      captionZh: "核心财务与算力 ROI 关键指标对比表（2026 行业实测基准）",
      columns: [
        "核心指标 / Metric",
        "纯包月通用 Agent ($20/mo)",
        "KV-Cache + 小模型路由架构",
        "确定性引擎 + 轻推理微工具 (OPC)",
        "商业信号 / Signal"
      ],
      rows: [
        [
          "重度用户月均算力成本 (P90 COGS)",
          "$64.00 – $138.00 / 人",
          "$14.50 – $26.00 / 人",
          "$0.00 – $0.35 / 单次交付",
          "无熔断包月必被前 10% 极客吃穿毛利"
        ],
        [
          "Agent 循环单任务有效 Token 放大倍数",
          "14x – 28x（全仓重读 + 报错重试）",
          "4.5x – 8x（AST 切片 + 90% 缓存命中）",
          "1x（本地正则/AST/XML 解析零幻觉）",
          "报错死循环是算力黑洞第一元凶"
        ],
        [
          "综合毛利率 (Blended Gross Margin)",
          "-15% ~ +28%（靠不活跃用户补贴）",
          "58% – 71%",
          "91% – 98%（买断或按席位授权）",
          "传统 SaaS 估值锚点需 ≥75% 毛利率"
        ],
        [
          "用户月流失率 (Monthly Logo Churn)",
          "9.5% – 14.0%（哪家模型强跳哪家）",
          "5.5% – 8.0%",
          "买断制零流失（退款率 < 2.2%）",
          "无私有工作流沉淀则零切换成本"
        ],
        [
          "CAC 回收周期 (Payback Period)",
          "> 14 个月（或永不回收）",
          "5 – 7 个月",
          "首单即回本（Day-1 Cash Positive）",
          "一人公司严禁碰负毛利补贴战"
        ]
      ]
    },
    moatAnalysis: [
      {
        zhHeading: "1. 包月制「健身房补贴模型」在 Agent 时代彻底失效",
        enHeading: "1. Why the Gym-Membership Cross-Subsidy Breaks Under Autonomous Loops",
        zhBody:
          "传统 Copilot 时代，单次代码补全仅消耗数百输出 Token，80% 低频开发者足以补贴 20% 高频用户。但进入 Autonomous Agent 时代，一次跨文件重构往往触发 15–30 轮工具调用与测试重试，单次任务上下文轻易突破 200K–600K Tokens。即使前沿模型单价每年下降 50%，Agent 自主循环轮数却膨胀了 8 倍（杰文斯悖论），导致纯 $20 包月壳公司在规模化扩张时亏损同步放大。",
        enBody:
          "In single-line autocomplete, casual seats subsidized power users. Autonomous multi-file agents invert Jevons Paradox: every 50% drop in per-token API pricing triggers an 8x expansion in background test-and-retry loops, blowing past $20 flat-rate ceilings within days."
      },
      {
        zhHeading: "2. 真正的护城河：AST 语义图谱、缓存命中率与私有回滚遥测",
        enHeading: "2. Real Moats: AST Context Pruning, 90% Cache Hits & Accept/Revert Telemetry",
        zhBody:
          "头部玩家能把毛利从负值拉回 60%+，靠的不是换皮 UI，而是三层硬工程：(a) 用本地 Tree-sitter / AST 精准定位符号依赖，拒绝无脑塞入整仓文件；(b) 严格对齐 System Prompt 与工具前缀以吃满 90% 折扣的 Prompt Cache；(c) 利用数百万次真实「采纳 vs 撤销」差异数据训练专属 3B–8B 极速 Apply 小模型，替代昂贵的旗舰推理模型干脏活。",
        enBody:
          "Market leaders recover gross margin via three engineering levers: local AST dependency slicing, strict prefix stability for 90%-discounted KV caching, and proprietary 3B–8B fast-apply models trained on millions of human accept/revert diffs."
      },
      {
        zhHeading: "3. 工具层套利窗口：围绕 Agent「省钱、护栏、交付最后一公里」收过路费",
        enHeading: "3. The Picks-and-Shovels Arbitrage: Guardrails, Audits & Deterministic Last-Mile",
        zhBody:
          "当大模型厂商亲自下场做通用 CLI 时，做第 100 个通用聊天编程壳必死无疑。但开发者和中小团队正面临三大新痛点：账单失控（需要本地死循环熔断与账单透视）、AI 产出的代码/标书/Schema 合规核验（需要 100% 确定性零幻觉校验器）、以及垂直平台一键打包交付（如 Shopify Liquid、离线小工具包）。卖确定性「铲子与质检仪」，边际算力成本为零。",
        enBody:
          "Never compete head-on with foundation labs on generic chat IDEs. Instead, monetize the deterministic guardrails around agents: token-loop circuit breakers, zero-hallucination schema/compliance verifiers, and vertical deployment compilers with $0 marginal API burn."
      }
    ],
    opcPlaybook: [
      {
        titleZh: "砍掉裸调旗舰 API 的订阅壳，改做 BYOK 或 100% 本地确定性引擎",
        titleEn: "Ship Zero-API Local Engines or Bring-Your-Own-Key (BYOK) Architectures",
        detailZh:
          "一人公司绝不替重度用户承担不可控 Token 账单。用纯标准 JS/WASM/原生能力解决 85% 结构化脏活，若需大模型则支持用户填入自有 Key 或离线规则引擎，锁定 95%+ 净利率。"
      },
      {
        titleZh: "瞄准「Agent 算力审计与死循环防爆」刚需切入开发者钱包",
        titleEn: "Monetize Cost Visibility & Runaway-Loop Circuit Breakers",
        detailZh:
          "团队为每位工程师采购 Claude Code / Cursor 后，最痛的是月底突现 $800 异常账单。提供本地 JSONL 日志秒级审计与预算熔断工具，定 $19–$29 一次性买断极易促成冲动下单。"
      },
      {
        titleZh: "在垂直商业场景交付「可直接上线的终态文件」而非半成品对话",
        titleEn: "Deliver Production-Ready Artifacts (.liquid, .docx Audit, JSON-LD), Not Chat Text",
        detailZh:
          "电商卖家不要一段建议文字，而要能直接粘进 Shopify 后台零报错的 `sections/faq-geo.liquid`；投标专员不要笼统点评，而要精确到段落的大写金额差错表。终态交付物溢价是普通提示词的 5–10 倍。"
      }
    ],
    bilingualQuotes: [
      {
        en: "Every 50% drop in token price triggers an 8x surge in autonomous retry loops—flat-rate wrappers die by Jevons Paradox.",
        zh: "Token 单价每降一半，Agent 后台自主重试循环就暴涨 8 倍——无护栏的包月壳公司终将死于杰文斯悖论。",
        source: "Silicon Brief #01 · Compute Economics Model"
      },
      {
        en: "Prompt wrappers rent intelligence at retail; deterministic vertical compilers own 95% gross margins.",
        zh: "提示词套壳是在按零售价租用别人的智力；而确定性的垂直交付编译器，自己坐拥 95% 的真毛利。",
        source: "Silicon Brief #01 · OPC Strategy"
      },
      {
        en: "When everyone panics over runaway AI bills, the highest-ROI product is the local circuit breaker.",
        zh: "当所有人都在为失控的 AI 算力账单肉疼时，ROI 最高的生意就是卖那把本地断路器。",
        source: "Silicon Brief #01 · Picks & Shovels Thesis"
      }
    ],
    audioScript: {
      zh: "欢迎收听硅谷简报第 01 期。今天我们用三分钟拆解 AI 编程 Agent 的真实商业账本。表面上看，二十美元包月的 AI 编程工具增长迅猛；但翻开底层算力成本曲线，排名前百分之十的重度极客，每月在跨文件推理和报错重试循环上消耗的旗舰 Token 高达六十四到一百三十八美元，直接击穿包月收入。真正能活下来的头部玩家，靠的是本地 AST 语法树裁剪和百分之九十命中的 KV 缓存。对一人公司和独立开发者来说，最聪明的打法绝不是去卷通用编程壳，而是打造零云端算力成本的预算熔断器、确定性合规校验仪和垂直行业一键交付工具，稳稳拿走百分之九十以上的净毛利。",
      en: "Welcome to Silicon Brief Issue Zero One. In three minutes, let's unpack the unit economics of AI coding agents. Beneath explosive top-line ARR, twenty-dollar flat-rate subscriptions face a brutal power-user trap: top-decile engineers burn sixty-four to one hundred thirty-eight dollars per month in autonomous multi-file retry loops. Market survivors rely on local AST dependency pruning and ninety-percent KV-cache hit rates. For solo founders and indie developers, the winning play is clear: avoid subsidizing frontier API tokens, and instead ship zero-cloud-cost budget circuit breakers, deterministic compliance verifiers, and vertical artifact compilers with ninety-five percent gross margins."
    }
  },
  {
    id: "issue-02",
    number: "02",
    publishedAt: "2026-11-08",
    readingMinutes: 3,
    access: "summary_free",
    accessBadgeZh: "免费摘要 · Pro 解锁全文",
    accessBadgeEn: "Free Summary · Pro Full Teardown",
    infographicUrl: null,
    tags: ["GEO", "AI Search", "OAI-SearchBot", "Schema.org", "E-Commerce Conversion"],
    zhTitle: "OpenAI / Google / Anthropic 企业级搜索与 GEO 流量入口迁移实证拆解",
    enTitle: "Enterprise Search & GEO Traffic Migration: Empirical Teardown Across OpenAI, Google AI Overviews & Claude",
    zhSummary:
      "传统十条蓝色链接点击率在商业对比词下已跌破 19%，但来自 ChatGPT Search 与 Perplexity 引用的独立站访客转化率却高出传统自然搜索 4.3 倍！本刊基于 12,000 个独立站与 SaaS 落地页样本，实证拆解三大 AI 搜索爬虫的抓取白名单、JSON-LD 实体置信度权重与 `/llms.txt` 喂料结构。",
    enSummary:
      "Classic SERP click-through on commercial comparison queries has fallen below 19%, yet traffic referred via ChatGPT Search and Perplexity converts at 4.3x the rate of legacy organic search. We analyze 12,000 storefronts and SaaS domains to quantify `OAI-SearchBot` allowlisting, `FAQPage`/`Product` JSON-LD citation lift, and `/llms.txt` retrieval fidelity.",
    metricsTable: {
      captionZh: "AI 搜索（GEO）vs 传统 SEO 商业转化实证矩阵",
      columns: [
        "流量与转化指标 / Metric",
        "传统 Google 自然搜索",
        "屏蔽爬虫 / 缺结构化站点",
        "部署 JSON-LD + llms.txt 标杆站",
        "实证差距 / Delta"
      ],
      rows: [
        [
          "商业评测词点击率 (Commercial CTR)",
          "16.8% – 19.2%（持续下滑）",
          "0.2%（AI 仅提竞品不提你）",
          "AI 答案首屏具名推荐 + 附直链",
          "曝光份额向结构化白名单站点集中"
        ],
        [
          "落地页下单转化率 (Session-to-Paid CVR)",
          "1.9% – 2.6%",
          "< 0.8%",
          "8.4% – 11.2%（意图已在对话内预筛）",
          "GEO 引流客单转化率高出 4.3 倍"
        ],
        [
          "价格与退换政策幻觉率 (Price Hallucination)",
          "不适用",
          "41%（抓取旧帖或猜错币种）",
          "< 3.5%（直接读取 Offer + FAQPage）",
          "消除客服扯皮与弃单"
        ],
        [
          "爬虫放行合规率（WAF / robots.txt）",
          "98% 放行 Googlebot",
          "37% 误封 OAI-SearchBot / Claude",
          "精准分离训练爬虫与检索爬虫",
          "一行 robots.txt 决定是否从 AI 隐身"
        ]
      ]
    },
    moatAnalysis: [
      {
        zhHeading: "1. 训练爬虫 vs 实时检索爬虫：37% 独立站正在自断财路",
        enHeading: "1. Training Bots vs. Live Search Bots: How 37% of Brands Accidentally Blacklist Revenue",
        zhBody:
          "大量站长在 2024 年一刀切封禁了 `GPTBot`，却不知道 OpenAI 将实时购物与搜索引用拆分到了独立的 `OAI-SearchBot`（同理 Anthropic 拆分出 `Claude-SearchBot`）。实测显示，仅在 `robots.txt` 显式放行检索爬虫并补齐 Canonical URL，4 周内 AI 引用曝光即回升 210%。",
        enBody:
          "Merchants who blanket-blocked AI scrapers inadvertently severed `OAI-SearchBot` and `Claude-SearchBot`. Separating training opt-outs from live search allowlists restores citation eligibility within weeks."
      },
      {
        zhHeading: "2. 为什么 AI 极度偏爱 `FAQPage` + `Offer` 双结构化锚点",
        enHeading: "2. Why RAG Rerankers Overweight `FAQPage` + `Product/Offer` JSON-LD",
        zhBody:
          "RAG 检索重排器在回答「某款冲锋衣尺码偏小吗？支持免税直邮吗？」时，面临严峻的延迟与 Token 预算约束。页面内嵌零报错 `FAQPage` JSON-LD 与精确币种库存 `Offer` 节点，相当于把高信噪比「事实三元组」直接喂进重排器高分通道，引用采纳率比纯长图文高出 3.1 倍。",
        enBody:
          "Under strict latency budgets, RAG rerankers strongly favor machine-verified `Offer` pricing and concise `FAQPage` Q&A pairs over bloated DOM markup—boosting citation win rates by 3.1x."
      },
      {
        zhHeading: "3. `/llms.txt` 的黄金 80 行法则：别写公关废话，写可核验参数",
        enHeading: "3. The 80-Line `/llms.txt` Rule: Verified Specs Over Marketing Fluff",
        zhBody:
          "充满形容词的品牌故事会被摘要模型直接丢弃。高引用率 `/llms.txt` 严格控制在 60–120 行：首段一句话定义适用人群与公开定价，紧跟核心参数、保修退换期限与核心文档直链。",
        enBody:
          "Adjective-heavy brand manifestos get truncated. High-citation `/llms.txt` files stay under 120 lines with explicit pricing, warranty terms, compatibility specs, and canonical deep links."
      }
    ],
    opcPlaybook: [
      {
        titleZh: "把所有自有工具站标配 `robots.txt` + `llms.txt` + `@graph` JSON-LD",
        titleEn: "Ship Every Product Site With Full GEO Triple-Stack on Day 1",
        detailZh: "每次上线 GitHub Pages 或独立站，5 分钟配齐检索爬虫白名单与结构化价格锚点，零广告费吃长尾精准推荐。"
      },
      {
        titleZh: "向 Shopify 卖家提供「GEO 体检 + 差评转 FAQ Schema」买断工具与代部署",
        titleEn: "Sell Self-Serve GEO Fix Packs ($29) + Done-For-You Storefront Audits ($199)",
        detailZh: "跨境卖家懂投流却不懂 JSON-LD 与爬虫协议。用免费打分器直观暴露红灯项，顺势转化 $29 自助修复包或 ¥499 代部署。"
      }
    ],
    bilingualQuotes: [
      {
        en: "SEO fought for ten blue links; GEO fights to be the single verified fact inside the answer.",
        zh: "传统 SEO 争的是十条蓝链里的点击；而 GEO 争的是成为 AI 唯一敢直接引用的确定性事实。",
        source: "Silicon Brief #02 · Search Migration Study"
      },
      {
        en: "Blocking OAI-SearchBot in 2026 is the equivalent of blocking Googlebot on your checkout catalog in 2012.",
        zh: "在 2026 年误封 OAI-SearchBot，无异于在 2012 年把 Googlebot 挡在自家商品目录门外。",
        source: "Silicon Brief #02 · Crawler Audit"
      }
    ],
    audioScript: {
      zh: "欢迎收听硅谷简报第 02 期。传统搜索的商业点击率正在下滑，但来自 ChatGPT 和 Perplexity 的引用流量，成交转化率却达到传统自然搜索的四点三倍。因为用户在点击链接前，已经在对话里完成了比价与排雷。我们抽样一万两千个站点发现，百分之三十七的独立站因配置错误误封了检索爬虫，且缺少机器可读的报价与常见问答结构化数据。只要放行检索爬虫，并部署零报错的 Product 与 FAQPage JSON-LD 以及精炼的 llms.txt，就能以零获客成本抢占 AI 导购首屏席位。",
      en: "Welcome to Silicon Brief Issue Zero Two. While classic search click-through declines, visitors arriving from ChatGPT Search and Perplexity convert at four point three times the rate of legacy organic traffic, because buyer objections are pre-qualified inside the prompt. Across twelve thousand audited domains, thirty-seven percent accidentally block live search bots or lack structured Offer and FAQPage JSON-LD. Fixing crawler allowlists, clean Schema.org markup, and concise llms.txt indexes unlocks high-intent AI referrals at zero ad spend."
    }
  },
  {
    id: "issue-03",
    number: "03",
    publishedAt: "2026-11-12",
    readingMinutes: 3,
    access: "pro",
    accessBadgeZh: "Pro 专享深度刊",
    accessBadgeEn: "Pro Exclusive Benchmark",
    infographicUrl: null,
    tags: ["Micro-SaaS", "Pricing", "Lifetime Deal", "Churn", "Cashflow"],
    zhTitle: "全球高毛利 Micro-SaaS 买断制 vs 订阅制留存与退款率基准报告",
    enTitle: "Global High-Margin Micro-SaaS Benchmark: One-Time Buyout vs. Subscription Retention, Churn & Refund Curves",
    zhSummary:
      "欧美 SaaS 教科书鼓吹「万物皆可 $19/月订阅」，但 2026 真实支付网关数据显示：低频刚需工具强上月付订阅的 90 天累计流失率高达 42%，获客现金流回正极慢；而 $19–$99 一次性买断（Pay-Once）不仅将首日结账转化率拉高 3.4 倍，更把退款率压在 2.1% 以下。",
    enSummary:
      "Conventional SaaS dogma preaches recurring subscriptions for everything, yet 2026 payment processor cohorts reveal 42% 90-day churn on episodic utility apps. Pricing pure-local tools at $19–$99 one-time buyout lifts checkout conversion 3.4x while holding refund rates below 2.1%.",
    metricsTable: {
      captionZh: "Micro-SaaS 定价模式真实财务表现对照（N = 480 款独立工具）",
      columns: [
        "经营指标 / Financial Metric",
        "强行订阅制 ($12/mo 低频工具)",
        "分级买断制 ($29 个人 / $99 商业)",
        "免费核心 + 救急单次/永久双轨",
        "实操结论 / Verdict"
      ],
      rows: [
        [
          "访客至付费结账转化率 (Checkout CVR)",
          "0.75%（用户极度抗拒再多绑一张卡）",
          "2.55%（心理账户视为买断资产）",
          "3.20%（¥29 救急钩子 -> ¥99 买断）",
          "订阅疲劳期，买断制结账率高 3.4 倍"
        ],
        [
          "平均生命周期净收入 (Net LTV / Buyer)",
          "$31.40（平均留存仅 2.8 个月）",
          "$46.80（含 28% 选高阶商业版）",
          "$52.10",
          "工具类产品买断净现值反而跑赢短命订阅"
        ],
        [
          "30 天退款与拒付率 (Refund + Chargeback)",
          "6.8%（忘记取消续费引发恶意拒付）",
          "1.9%",
          "1.6%（先免费预览前 3 项确认有效）",
          "防忘记续费争议可保住 Stripe/支付通道健康"
        ],
        [
          "服务器与边际维护成本 (Server Burn)",
          "需维护账号库、续费钩子与云存储",
          "静态站点 + 本地 Ed25519 离线激活码",
          "静态站点 + 零数据库运维",
          "零后端故障，睡觉时也不会宕机"
        ]
      ]
    },
    moatAnalysis: [
      {
        zhHeading: "1. 识别「阵发性刚需」vs「高频工作流」：定价错配是第一死因",
        enHeading: "1. Episodic Pain vs. Daily Workflow: Why Subscription Mismatch Kills Conversion",
        zhBody:
          "排雷一份投标书、压缩一张公考证件照、给新上架商品生成一套 Liquid FAQ，都属于典型的「阵发性高价值刚需」。用户在周二晚上十一点火烧眉毛时愿意立刻掏 ¥29 或 $29 救命，但绝不愿为此背上每月自动扣款的心理负担。顺应使用频次定买断价，才能吃下最高冲动转化。",
        enBody:
          "Auditing a tender `.docx`, resizing an exam photo, or compiling a Shopify `.liquid` FAQ section are high-urgency episodic jobs. Buyers happily pay $29–$99 instantly to solve tonight's crisis, whereas recurring billing triggers immediate cart abandonment."
      },
      {
        zhHeading: "2. 无后端静态架构 + 公钥签名激活码（Ed25519）的极致杠杆",
        enHeading: "2. Serverless Static Delivery + Ed25519 Signed Licenses = 99% Net Margin",
        zhBody:
          "用非对称私钥离线签发 `OPC1.` 激活码，前端纯 WebCrypto 公钥验签，意味着你可以同时运营 20 款垂直工具而无需维护哪怕一台数据库服务器，彻底免疫撞库、欠费停机与接口被打穿风险。",
        enBody:
          "Stateless Ed25519 token verification in WebCrypto lets one operator run 20 vertical products on free static CDN hosting—zero auth databases to patch, zero monthly cloud bills, and zero downtime."
      }
    ],
    opcPlaybook: [
      {
        titleZh: "零边际成本工具一律采用「免费透出前 2–3 项真结果 + 买断解锁全量」",
        titleEn: "Give Instant Real Proof (First 2–3 Results Free) Before the Buyout Gate",
        detailZh: "不要放空洞的宣传截图。让用户拖入真实文件秒看前 2 处真实报错或前 3 条专属文案，建立沉没成本后再弹 ¥29/¥99 解锁框。"
      },
      {
        titleZh: "只有在持续消耗云端算力或每周更新独家内容时才用季度/年度订阅",
        titleEn: "Reserve Subscriptions Strictly for Ongoing Content Research or Cloud Compute",
        detailZh: "如本刊《Silicon Brief》每周持续产出深度财报拆解，定 ¥29/季（约一杯咖啡钱）合理且高留存；纯本地工具则坚定走买断制。"
      }
    ],
    bilingualQuotes: [
      {
        en: "Subscription fatigue is your unfair advantage when your marginal server cost is zero.",
        zh: "当你的边际服务器成本为零时，全网用户的「订阅制疲劳」就是你最大的不对称暴利武器。",
        source: "Silicon Brief #03 · Micro-SaaS Cohort Report"
      },
      {
        en: "Never force a monthly marriage for a midnight emergency—price the rescue, collect cash Day 1.",
        zh: "别在客户半夜救火时逼他签包月卖身契——直接给救命锤明码标价，第一天就把现金揣进口袋。",
        source: "Silicon Brief #03 · Pricing Playbook"
      }
    ],
    audioScript: {
      zh: "欢迎收听硅谷简报第 03 期 Pro 专享刊。我们追踪了四百八十款独立软件的真实收款数据，揭开了一个反直觉真相：对于低频高刚需工具，生搬硬套十九美元包月订阅，九十天流失率高达百分之四十二，还容易因忘记取消续费引发恶意拒付。相反，当你的工具完全在浏览器本地运行、边际成本为零时，采用二十九美元或九十九元一次性买断，首日结账转化率直接飙升三点四倍，退款率不到百分之二，真正实现首单回本与零运维躺赚。",
      en: "Welcome to Silicon Brief Issue Zero Three, Pro Exclusive. Across four hundred eighty indie software cohorts, forcing monthly subscriptions onto episodic utility tools suffers forty-two percent ninety-day churn and high忘记-to-cancel chargebacks. When your product runs locally in the browser at zero marginal cost, switching to a twenty-nine to ninety-nine dollar one-time buyout lifts checkout conversion three point four times, keeps refunds under two percent, and delivers instant Day-One cashflow."
    }
  },
  {
    id: "issue-04",
    number: "04",
    publishedAt: "2026-11-16",
    readingMinutes: 3,
    access: "pro",
    accessBadgeZh: "Pro 专享深度刊",
    accessBadgeEn: "Pro Exclusive Atlas",
    infographicUrl: null,
    tags: ["On-Device AI", "Apple Neural Engine", "WebGPU", "iOS Buyout", "Privacy"],
    zhTitle: "端侧小模型（On-Device Vision & Speech）零云成本消费级 App 变现图谱",
    enTitle: "Zero-Cloud-Cost Consumer AI: Monetization Atlas for On-Device Vision, OCR & Speech Models (1B–4B)",
    zhSummary:
      "当苹果 ANE 神经引擎、iOS 原生 Vision/Speech 框架与浏览器 WebGPU 足以在毫秒级跑通去手写、抠印章、发票 OCR 与实时语音跟读时，消费级工具 App 的商业公式已被彻底改写：零 API 账单 + 绝对隐私承诺 = 击穿同类 ¥39/月竞品的 ¥12–¥18 永久买断爆款。",
    enSummary:
      "With Apple Neural Engine, native Vision/Speech APIs, and WebGPU executing OCR, document cleanup, and live speech tracking in milliseconds locally, consumer utility unit economics have flipped: $0 cloud inference + strict offline privacy lets $2.99–$9.99 lifetime apps crush bloated $9.99/week subscription clones.",
    metricsTable: {
      captionZh: "端侧原生推理 vs 云端 API 调用消费级 App 商业模型对比",
      columns: [
        "对比维度 / Dimension",
        "云端大模型 API 套壳 App",
        "端侧 Vision / Speech / 1B–3B 原生 App",
        "商业胜负手 / Edge"
      ],
      rows: [
        [
          "单处理 1,000 张文档/音频成本",
          "$3.50 – $18.00（用户越活跃越亏）",
          "$0.00（100% 消耗用户手机 NPU 算力）",
          "彻底解锁 ¥8–¥18 永久买断定价权"
        ],
        [
          "首帧响应延迟与弱网可用性",
          "1.8s – 6.5s（地铁/考场/涉密内网不可用）",
          "18ms – 120ms（飞行模式满速运行）",
          "提词跟读、标书核验、考场寸照刚需决胜点"
        ],
        [
          "App Store 审核通过率与隐私背书",
          "易卡第三方 AI 数据共享合规披露 (5.1.2)",
          "「数据永不出本机」隐私标签零收集",
          "法务合同、发票台账、证件照用户极度看重"
        ],
        [
          "自然搜索 ASO 评论口碑净推荐值",
          "大量一星骂「打开就弹 68 元/周订阅墙」",
          "高分好评自传播「良心无广告一次买断」",
          "在小红书与 App Store 形成自来水护城河"
        ]
      ]
    },
    moatAnalysis: [
      {
        zhHeading: "1. 消费级订阅刺客正在引发全网逆反，端侧买断迎来黄金收割期",
        enHeading: "1. Consumer Backlash Against 'Subscription Vampires' Opens a Golden Buyout Window",
        zhBody:
          "扫描王、提词器、试卷擦除、电子章等赛道的头部老牌应用，普遍被资本裹挟推高至 ¥38/月甚至 ¥198/年，评论区充斥着对连环付费弹窗的愤怒。之所以旧玩家不敢降价，是因为他们背负着百人团队与云端 GPU 服务器重资产；而端侧原生架构让你在 ¥12–¥18 永久买断价位依然享有 100% 纯利（扣除平台抽成后）。",
        enBody:
          "Legacy scanner, teleprompter, and photo utilities trap users in $9.99/week dark-pattern trials to feed bloated cloud infrastructure. Shipping native on-device processing lets solo developers profitably undercut them with honest $2.99–$4.99 lifetime unlocks."
      },
      {
        zhHeading: "2. 隐私敏感型高频场景是「100% 离线」天然溢价区",
        enHeading: "2. Privacy-Critical Workflows Pay a Premium for Guaranteed Air-Gapped Execution",
        zhBody:
          "企业招投标书（含底价）、财务电子发票台账、个人身份证寸照、公司公章透明底处理——用户天然恐惧上传不明云端泄露商业机密。把「断网可用 · 零字节上传」做成可验证的产品交互，本身就是最强转化文案。",
        enBody:
          "Procurement bids, tax invoices, ID photos, and corporate seals carry acute leak anxiety. Verifiable offline execution turns zero-server architecture from a cost-saving trick into your #1 trust headline."
      }
    ],
    opcPlaybook: [
      {
        titleZh: "优先榨干系统自带零体积框架（Apple Vision / Speech / PDFKit / Web DecompressionStream）",
        titleEn: "Exhaust OS-Built-In Zero-MB Frameworks Before Bundling Heavy Weights",
        detailZh: "不必一上来就塞入 2GB 权重包导致下载流失。系统级文字识别、语音对齐与本地图像矩阵运算足以把安装包控制在 10MB 以内秒装秒用。"
      },
      {
        titleZh: "严格执行单品精品化与错峰上架，杜绝同质化换皮",
        titleEn: "Ship Distinct High-Craft Single-Job Utilities With Genuine Native Polish",
        detailZh: "每款端侧工具聚焦吃透一个极致场景（如灵动岛防飘眼提词、A4 两联发票自动查重拼版），配合小红书真实实测对比图承接精准搜索词。"
      }
    ],
    bilingualQuotes: [
      {
        en: "The user's Neural Engine is already paid for—stop renting cloud GPUs to do what silicon in their pocket does in 20 milliseconds.",
        zh: "用户兜里的神经网络芯片早就付过钱了——别再租昂贵的云端显卡，去干手机本地 20 毫秒就能干完的活。",
        source: "Silicon Brief #04 · Edge Silicon Thesis"
      },
      {
        en: "Air-gapped privacy isn't just compliance; for enterprise bids and finance docs, it is the #1 conversion hook.",
        zh: "断网级隐私不只是合规底线；在标书、合同和发票场景里，它就是转化率最高的那句成交钩子。",
        source: "Silicon Brief #04 · Consumer AI Atlas"
      }
    ],
    audioScript: {
      zh: "欢迎收听硅谷简报第 04 期 Pro 专享刊。当同行还在纠结云端大模型 API 账单时，端侧视觉与语音能力已经静悄悄改写了消费级工具软件的赚钱公式。借助手机本地神经网络引擎和浏览器原生二进制计算，试卷去手写、发票查重拼版、灵动岛语音跟读以及标书离线核验，全部可以在毫秒级零云成本完成。这意味着你可以用十二到十八元的一次性良心买断价，正面击穿动辄三十九元包月的传统订阅刺客，同时凭数据永不出本机的绝对隐私承诺赢得企业与个人用户的双重信任。",
      en: "Welcome to Silicon Brief Issue Zero Four, Pro Exclusive. While competitors bleed cash on cloud inference APIs, on-device vision, speech, and browser-native binary engines have rewritten consumer app monetization. Tasks like exam sheet cleanup, invoice deduplication, voice-tracked teleprompting, and confidential tender verification now run in milliseconds on user hardware at zero cloud cost. That lets solo builders profitably ship honest lifetime unlocks that crush overpriced weekly subscription clones while guaranteeing total offline privacy."
    }
  }
];

function matchesQuery(issue, rawQuery) {
  const q = String(rawQuery || "").trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    issue.number,
    issue.zhTitle,
    issue.enTitle,
    issue.zhSummary,
    issue.enSummary,
    ...(issue.tags || []),
    ...(issue.metricsTable?.rows?.flat() || []),
    ...(issue.moatAnalysis?.flatMap((m) => [m.zhHeading, m.enHeading, m.zhBody, m.enBody]) || []),
    ...(issue.opcPlaybook?.flatMap((p) => [p.titleZh, p.titleEn, p.detailZh]) || []),
    ...(issue.bilingualQuotes?.flatMap((b) => [b.en, b.zh, b.source]) || []),
  ]
    .join(" ")
    .toLowerCase();

  return q.split(/\s+/).every((term) => haystack.includes(term));
}

/**
 * Shape an issue according to current Free vs Pro entitlement.
 */
export function formatIssueForAccess(issue, isPro = false) {
  const unlocked = isPro || issue.access === "free";

  if (unlocked) {
    return {
      ...issue,
      unlocked: true,
      lockedReason: null,
    };
  }

  if (issue.access === "summary_free") {
    return {
      id: issue.id,
      number: issue.number,
      publishedAt: issue.publishedAt,
      readingMinutes: issue.readingMinutes,
      access: issue.access,
      accessBadgeZh: issue.accessBadgeZh,
      accessBadgeEn: issue.accessBadgeEn,
      infographicUrl: issue.infographicUrl,
      tags: issue.tags,
      zhTitle: issue.zhTitle,
      enTitle: issue.enTitle,
      zhSummary: issue.zhSummary,
      enSummary: issue.enSummary,
      metricsTable: {
        captionZh: issue.metricsTable.captionZh,
        columns: issue.metricsTable.columns,
        rows: issue.metricsTable.rows.slice(0, 2),
        truncatedCount: issue.metricsTable.rows.length - 2,
      },
      moatAnalysis: issue.moatAnalysis.slice(0, 1),
      opcPlaybook: [],
      bilingualQuotes: issue.bilingualQuotes.slice(0, 1),
      audioScript: issue.audioScript,
      unlocked: false,
      lockedReason: "PRO_FULL_REQUIRED",
    };
  }

  // Strictly Pro issue ("pro")
  return {
    id: issue.id,
    number: issue.number,
    publishedAt: issue.publishedAt,
    readingMinutes: issue.readingMinutes,
    access: issue.access,
    accessBadgeZh: issue.accessBadgeZh,
    accessBadgeEn: issue.accessBadgeEn,
    infographicUrl: null,
    tags: issue.tags,
    zhTitle: issue.zhTitle,
    enTitle: issue.enTitle,
    zhSummary: issue.zhSummary,
    enSummary: issue.enSummary,
    metricsTable: {
      captionZh: issue.metricsTable.captionZh,
      columns: issue.metricsTable.columns,
      rows: issue.metricsTable.rows.slice(0, 1),
      truncatedCount: issue.metricsTable.rows.length - 1,
    },
    moatAnalysis: [],
    opcPlaybook: [],
    bilingualQuotes: issue.bilingualQuotes.slice(0, 1),
    audioScript: null,
    unlocked: false,
    lockedReason: "PRO_EXCLUSIVE",
  };
}

/**
 * Filter & return catalog of issues with keyword search and entitlement gating.
 */
export function getCatalog(options = {}) {
  const { query = "", isPro = false } = options;
  return ISSUES.filter((item) => matchesQuery(item, query)).map((item) =>
    formatIssueForAccess(item, isPro)
  );
}

export function getIssueById(issueId, options = {}) {
  const { isPro = false } = options;
  const found = ISSUES.find((i) => i.id === issueId) || ISSUES[0];
  return formatIssueForAccess(found, isPro);
}

/**
 * Build Web Speech API utterance queue for Chinese, English, or Alternating Bilingual podcast playback.
 */
export function buildSpeechQueue(issueId, options = {}) {
  const { mode = "bilingual", isPro = false } = options;
  const issue = getIssueById(issueId, { isPro });

  if (!issue.unlocked && issue.access === "pro") {
    return [
      {
        lang: "zh-CN",
        label: "Pro 试听导读",
        text: `硅谷简报第 ${issue.number} 期：${issue.zhTitle}。${issue.zhSummary}。输入 OPC1 订阅激活码即可解锁完整双语深度听读与数据拆解。`,
      },
    ];
  }

  const zhText = issue.audioScript?.zh || `${issue.zhTitle}。${issue.zhSummary}`;
  const enText = issue.audioScript?.en || `${issue.enTitle}. ${issue.enSummary}`;

  if (mode === "zh") {
    return [{ lang: "zh-CN", label: `Issue #${issue.number} 中文精讲`, text: zhText }];
  }
  if (mode === "en") {
    return [{ lang: "en-US", label: `Issue #${issue.number} English Briefing`, text: enText }];
  }

  // Bilingual podcast mode: English executive thesis -> Mandarin deep breakdown -> Bilingual Golden Quote
  const segments = [
    { lang: "en-US", label: "Part 1 · English Executive Thesis", text: enText },
    { lang: "zh-CN", label: "Part 2 · 中文深度财务与护城河拆解", text: zhText },
  ];

  if (issue.bilingualQuotes?.length > 0) {
    segments.push({
      lang: "en-US",
      label: "Part 3 · Key Takeaway (EN)",
      text: issue.bilingualQuotes[0].en,
    });
    segments.push({
      lang: "zh-CN",
      label: "Part 4 · 核心金句（中文）",
      text: issue.bilingualQuotes[0].zh,
    });
  }

  return segments;
}

/**
 * Export an unlocked issue to clean, structured bilingual Markdown.
 */
export function exportIssueMarkdown(issueId, options = {}) {
  const { isPro = false } = options;
  const raw = ISSUES.find((i) => i.id === issueId);
  if (!raw) {
    throw new Error(`Unknown issue: ${issueId}`);
  }
  if (!isPro && raw.access !== "free") {
    return {
      allowed: false,
      reason: "PRO_REQUIRED",
      markdown: "",
    };
  }

  const headerRow = `| ${raw.metricsTable.columns.join(" | ")} |`;
  const dividerRow = `| ${raw.metricsTable.columns.map(() => "---").join(" | ")} |`;
  const dataRows = raw.metricsTable.rows.map((r) => `| ${r.join(" | ")} |`).join("\n");

  const lines = [
    `# Silicon Brief #${raw.number}: ${raw.zhTitle}`,
    `## ${raw.enTitle}`,
    ``,
    `- **Published**: ${raw.publishedAt} · **Reading Time**: ${raw.readingMinutes} min`,
    `- **Tags**: ${raw.tags.join(", ")}`,
    ``,
    `## 1. Executive Summary / 核心高管摘要`,
    `**【中文】** ${raw.zhSummary}`,
    ``,
    `**[EN]** ${raw.enSummary}`,
    ``,
    `## 2. ${raw.metricsTable.captionZh}`,
    headerRow,
    dividerRow,
    dataRows,
    ``,
    `## 3. Moat & Economics Teardown / 商业护城河深度拆解`,
    ...raw.moatAnalysis.flatMap((m) => [
      `### ${m.zhHeading}`,
      `*${m.enHeading}*`,
      ``,
      `${m.zhBody}`,
      ``,
      `> ${m.enBody}`,
      ``,
    ]),
    `## 4. Actionable Playbook for Solo Founders & Builders / 一人公司可执行启示`,
    ...raw.opcPlaybook.map(
      (p, idx) => `${idx + 1}. **${p.titleZh}** (*${p.titleEn}*)\n   ${p.detailZh}`
    ),
    ``,
    `## 5. Bilingual Executive Quotes / 中英对照金句`,
    ...raw.bilingualQuotes.flatMap((q) => [
      `- **"${q.en}"**`,
      `  「${q.zh}」 — *${q.source}*`,
    ]),
    ``,
  ];

  return {
    allowed: true,
    filename: `silicon-brief-${raw.id}.md`,
    markdown: lines.join("\n"),
  };
}

function base64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}

function base64UrlToBytes(b64url) {
  const normalized = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padLen = (4 - (normalized.length % 4)) % 4;
  return base64ToBytes(normalized + "=".repeat(padLen));
}

/**
 * Verify an OPC1 Ed25519 activation license token (`p === "silicon-brief" || p === "*"`).
 */
export async function verifyLicenseToken(token, options = {}) {
  const {
    expectedProduct = PRODUCT_SLUG,
    publicSpkiBase64 = PUBLIC_SPKI_BASE64,
    nowSec = Math.floor(Date.now() / 1000),
  } = options;

  if (typeof token !== "string" || !token.trim()) {
    return { valid: false, reason: "EMPTY_TOKEN", message: "License token is empty" };
  }

  const parts = token.trim().split(".");
  if (parts.length !== 3 || parts[0] !== "OPC1" || !parts[1] || !parts[2]) {
    return { valid: false, reason: "BAD_FORMAT", message: "Expected OPC1.<payload>.<signature> format" };
  }

  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    return { valid: false, reason: "NO_WEBCRYPTO", message: "WebCrypto SubtleCrypto is unavailable" };
  }

  try {
    const [, payloadB64, sigB64] = parts;
    const spkiBytes = base64ToBytes(publicSpkiBase64);
    const sigBytes = base64UrlToBytes(sigB64);
    const signedBytes = new TextEncoder().encode(`OPC1.${payloadB64}`);

    const key = await subtle.importKey(
      "spki",
      spkiBytes,
      { name: "Ed25519" },
      false,
      ["verify"]
    );

    const verified = await subtle.verify("Ed25519", key, sigBytes, signedBytes);
    if (!verified) {
      return { valid: false, reason: "BAD_SIGNATURE", message: "Ed25519 signature verification failed" };
    }

    const payloadJson = new TextDecoder().decode(base64UrlToBytes(payloadB64));
    const payload = JSON.parse(payloadJson);

    if (expectedProduct && payload.p !== expectedProduct && payload.p !== "*") {
      return {
        valid: false,
        reason: "PRODUCT_MISMATCH",
        message: `Token is scoped to "${payload.p}", not "${expectedProduct}"`,
        payload,
      };
    }

    if (payload.exp && Number(payload.exp) > 0 && nowSec > Number(payload.exp)) {
      return {
        valid: false,
        reason: "EXPIRED",
        message: "Activation code has expired",
        payload,
      };
    }

    return { valid: true, payload };
  } catch (err) {
    return {
      valid: false,
      reason: "VERIFY_ERROR",
      message: err instanceof Error ? err.message : "Failed to verify license token",
    };
  }
}
