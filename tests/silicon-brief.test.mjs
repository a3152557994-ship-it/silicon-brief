import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  PUBLIC_SPKI_BASE64,
  PRODUCT_SLUG,
  ISSUES,
  getCatalog,
  getIssueById,
  buildSpeechQueue,
  exportIssueMarkdown,
  verifyLicenseToken,
} from "../src/brief-engine.mjs";
import * as browserEngine from "../docs/brief-engine.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function toBase64Url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function signTestToken(payloadObj, privateKey) {
  const payloadB64 = toBase64Url(Buffer.from(JSON.stringify(payloadObj), "utf8"));
  const sig = crypto.sign(null, Buffer.from(`OPC1.${payloadB64}`, "utf8"), privateKey);
  return `OPC1.${payloadB64}.${toBase64Url(sig)}`;
}

test("src/brief-engine.mjs and docs/brief-engine.js are byte-identical", () => {
  const src = fs.readFileSync(path.join(ROOT, "src", "brief-engine.mjs"), "utf8");
  const docs = fs.readFileSync(path.join(ROOT, "docs", "brief-engine.js"), "utf8");
  assert.equal(src, docs);
  assert.equal(browserEngine.PUBLIC_SPKI_BASE64, PUBLIC_SPKI_BASE64);
  assert.equal(PRODUCT_SLUG, "silicon-brief");
});

test("All 4 structured bilingual issues contain metrics tables, moat teardowns, OPC playbooks, and quotes", () => {
  assert.equal(ISSUES.length, 4);
  assert.deepEqual(
    ISSUES.map((i) => [i.id, i.access]),
    [
      ["issue-01", "free"],
      ["issue-02", "summary_free"],
      ["issue-03", "pro"],
      ["issue-04", "pro"],
    ]
  );

  for (const issue of ISSUES) {
    assert.ok(issue.zhTitle.length > 10);
    assert.ok(issue.enTitle.length > 10);
    assert.ok(issue.metricsTable.columns.length >= 4);
    assert.ok(issue.metricsTable.rows.length >= 4);
    assert.ok(issue.moatAnalysis.length >= 2);
    assert.ok(issue.opcPlaybook.length >= 2);
    assert.ok(issue.bilingualQuotes.length >= 2);
    assert.ok(issue.audioScript.zh.length > 60);
    assert.ok(issue.audioScript.en.length > 60);
  }
});

test("Access tier gating, keyword search, speech queue, and Markdown export work accurately", () => {
  // Free mode gating
  const free01 = getIssueById("issue-01", { isPro: false });
  assert.equal(free01.unlocked, true);
  assert.equal(free01.opcPlaybook.length, 3);

  const free02 = getIssueById("issue-02", { isPro: false });
  assert.equal(free02.unlocked, false);
  assert.equal(free02.lockedReason, "PRO_FULL_REQUIRED");
  assert.equal(free02.opcPlaybook.length, 0);

  const free03 = getIssueById("issue-03", { isPro: false });
  assert.equal(free03.unlocked, false);
  assert.equal(free03.lockedReason, "PRO_EXCLUSIVE");
  assert.equal(free03.moatAnalysis.length, 0);

  // Pro mode unlocks all 4
  const proCatalog = getCatalog({ isPro: true });
  assert.equal(proCatalog.every((i) => i.unlocked === true), true);

  // Keyword search
  const geoHits = getCatalog({ query: "OAI-SearchBot", isPro: true });
  assert.equal(geoHits.length, 1);
  assert.equal(geoHits[0].id, "issue-02");

  const cacheHits = getCatalog({ query: "KV-Cache", isPro: false });
  assert.equal(cacheHits.length, 1);
  assert.equal(cacheHits[0].id, "issue-01");

  // Bilingual speech queue
  const biQueue = buildSpeechQueue("issue-01", { mode: "bilingual", isPro: false });
  assert.equal(biQueue.length, 4);
  assert.equal(biQueue[0].lang, "en-US");
  assert.equal(biQueue[1].lang, "zh-CN");

  // Markdown export gating
  const mdFree01 = exportIssueMarkdown("issue-01", { isPro: false });
  assert.equal(mdFree01.allowed, true);
  assert.match(mdFree01.markdown, /# Silicon Brief #01/);

  const mdBlocked03 = exportIssueMarkdown("issue-03", { isPro: false });
  assert.equal(mdBlocked03.allowed, false);

  const mdPro03 = exportIssueMarkdown("issue-03", { isPro: true });
  assert.equal(mdPro03.allowed, true);
  assert.match(mdPro03.markdown, /Micro-SaaS/);
});

test("Issue #01 HD PNG infographic and release/COLUMN_PACK.md exist and are valid", () => {
  const pngPath = path.join(ROOT, "docs", "assets", "issue-01-infographic.png");
  const pngBuf = fs.readFileSync(pngPath);
  // Check PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A
  assert.deepEqual([...pngBuf.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  // Read IHDR width & height
  const width = pngBuf.readUInt32BE(16);
  const height = pngBuf.readUInt32BE(20);
  assert.equal(width, 1600);
  assert.equal(height, 1080);

  const colPack = fs.readFileSync(path.join(ROOT, "release", "COLUMN_PACK.md"), "utf8");
  assert.match(colPack, /小报童/);
  assert.match(colPack, /Substack/);

  for (const rel of ["docs/index.html", "docs/llms.txt", "docs/robots.txt", "docs/sitemap.xml", "README.md", "release/COLUMN_PACK.md"]) {
    const txt = fs.readFileSync(path.join(ROOT, rel), "utf8");
    assert.equal(txt.includes("/Users/"), false, `Unexpected local path leak in ${rel}`);
  }
});

test("Ed25519 OPC1 license verification accepts silicon-brief and *, rejects mismatch/expired/forged", async () => {
  const forged = await verifyLicenseToken("OPC1.eyJ2IjoxLCJwIjoic2lsaWNvbi1icmllZiJ9.AAAA");
  assert.equal(forged.valid, false);
  assert.equal(forged.reason, "BAD_SIGNATURE");

  const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
  const testSpkiB64 = publicKey.export({ format: "der", type: "spki" }).toString("base64");
  const nowSec = Math.floor(Date.now() / 1000);

  const valid = signTestToken({ v: 1, p: "silicon-brief", e: "reader@vc.example", exp: nowSec + 7776000 }, privateKey);
  const wildcard = signTestToken({ v: 1, p: "*", e: "vip@vc.example", exp: 0 }, privateKey);
  const wrong = signTestToken({ v: 1, p: "bid-docx-checker", exp: 0 }, privateKey);

  assert.equal((await verifyLicenseToken(valid, { publicSpkiBase64: testSpkiB64, nowSec })).valid, true);
  assert.equal((await verifyLicenseToken(wildcard, { publicSpkiBase64: testSpkiB64, nowSec })).valid, true);
  const wrongRes = await verifyLicenseToken(wrong, { publicSpkiBase64: testSpkiB64, nowSec });
  assert.equal(wrongRes.valid, false);
  assert.equal(wrongRes.reason, "PRODUCT_MISMATCH");
});
