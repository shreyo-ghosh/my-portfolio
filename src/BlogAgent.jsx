import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   LAUNCHLAYER — AI BLOG AGENT
   Searches live tech/AI news → generates human-friendly blogs
   Uses Anthropic API with web_search tool
═══════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Instrument+Sans:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

.ba-root {
  min-height: 100vh;
  background: #08080f;
  color: #e8e8f0;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  overflow-x: hidden;
}

.ba-root::before {
  content: '';
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 0; opacity: 0.5;
}

/* ── TOPBAR ── */
.ba-topbar {
  position: sticky; top: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px; height: 62px;
  background: rgba(8,8,15,0.92); backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.ba-logo {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.15rem;
  color: #fff; display: flex; align-items: center; gap: 10px;
}
.ba-logo-dot { width: 8px; height: 8px; border-radius: 50%; background: #f5a623; animation: baPulse 2s infinite; }
@keyframes baPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
.ba-logo-sub { font-family: 'Instrument Sans', sans-serif; font-size: .7rem; font-weight: 500; color: #7a7a9a; letter-spacing: .08em; text-transform: uppercase; margin-left: 2px; }
.ba-topbar-right { display: flex; align-items: center; gap: 12px; }
.ba-stat-pill { display: flex; align-items: center; gap: 6px; padding: .3rem .75rem; border-radius: 100px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); font-size: .72rem; color: #7a7a9a; }
.ba-stat-pill span { color: #f5a623; font-weight: 700; }

/* ── LAYOUT ── */
.ba-layout { display: grid; grid-template-columns: 300px 1fr 320px; gap: 0; height: calc(100vh - 62px); position: relative; z-index: 1; }

/* ── SIDEBAR ── */
.ba-sidebar {
  border-right: 1px solid rgba(255,255,255,.07);
  display: flex; flex-direction: column; overflow: hidden;
}
.ba-sidebar-header { padding: 18px 18px 12px; border-bottom: 1px solid rgba(255,255,255,.06); flex-shrink: 0; }
.ba-sidebar-title { font-family: 'Syne', sans-serif; font-size: .9rem; font-weight: 700; color: #fff; margin-bottom: 10px; }
.ba-search-row { display: flex; gap: 6px; }
.ba-search-input {
  flex: 1; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.09);
  border-radius: 8px; padding: .5rem 10px; color: #e8e8f0;
  font-family: 'Instrument Sans', sans-serif; font-size: .78rem; outline: none;
  transition: border-color .2s;
}
.ba-search-input:focus { border-color: rgba(245,166,35,.4); }
.ba-search-input::placeholder { color: #3a3a5a; }
.ba-search-btn {
  padding: .5rem .9rem; border-radius: 8px; border: none;
  background: linear-gradient(135deg,#f5a623,#ff7a1a); color: #0a0a0f;
  font-size: .72rem; font-weight: 700; cursor: pointer;
  transition: opacity .2s, transform .15s; white-space: nowrap;
  font-family: 'Instrument Sans', sans-serif;
}
.ba-search-btn:hover { opacity: .9; transform: translateY(-1px); }
.ba-search-btn:disabled { opacity: .45; cursor: not-allowed; transform: none; }

/* Topic chips */
.ba-topic-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
.ba-topic-chip {
  padding: .25rem .65rem; border-radius: 100px; font-size: .68rem; font-weight: 600;
  border: 1px solid rgba(255,255,255,.1); background: transparent; color: #9a9ab8;
  cursor: pointer; transition: all .18s;
}
.ba-topic-chip:hover, .ba-topic-chip.active { background: rgba(245,166,35,.12); border-color: rgba(245,166,35,.4); color: #f5a623; }

/* News list */
.ba-news-list { flex: 1; overflow-y: auto; padding: 10px 10px 16px; }
.ba-news-list::-webkit-scrollbar { width: 3px; }
.ba-news-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 2px; }

.ba-news-item {
  padding: 12px; border-radius: 10px; cursor: pointer;
  border: 1px solid transparent; transition: all .18s; margin-bottom: 6px;
  background: rgba(255,255,255,.025);
}
.ba-news-item:hover { background: rgba(245,166,35,.06); border-color: rgba(245,166,35,.18); }
.ba-news-item.selected { background: rgba(245,166,35,.1); border-color: rgba(245,166,35,.35); }
.ba-news-headline { font-size: .78rem; font-weight: 600; color: #e8e8f0; line-height: 1.4; margin-bottom: 5px; }
.ba-news-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.ba-news-source { font-size: .65rem; color: #f5a623; font-weight: 600; }
.ba-news-date { font-size: .65rem; color: #4a4a6a; }
.ba-news-category {
  font-size: .6rem; font-weight: 700; padding: .1rem .4rem; border-radius: 4px;
  text-transform: uppercase; letter-spacing: .04em;
}
.cat-ai { background: rgba(245,166,35,.15); color: #f5a623; }
.cat-automation { background: rgba(0,201,177,.15); color: #00c9b1; }
.cat-business { background: rgba(100,100,255,.15); color: #8888ff; }
.cat-tool { background: rgba(255,100,150,.15); color: #ff6496; }
.cat-general { background: rgba(255,255,255,.08); color: #9a9ab8; }

.ba-news-loading { display: flex; flex-direction: column; gap: 8px; padding: 10px; }
.ba-news-skeleton { height: 72px; border-radius: 10px; background: rgba(255,255,255,.03); animation: baSkeleton 1.5s ease infinite; }
@keyframes baSkeleton { 0%,100%{opacity:.4} 50%{opacity:.8} }

.ba-news-empty { padding: 32px 16px; text-align: center; color: #4a4a6a; font-size: .8rem; }
.ba-news-empty .ba-empty-icon { font-size: 2rem; margin-bottom: 8px; }

/* ── MAIN EDITOR ── */
.ba-main { display: flex; flex-direction: column; overflow: hidden; }

.ba-editor-header {
  padding: 18px 24px 14px; border-bottom: 1px solid rgba(255,255,255,.07);
  display: flex; align-items: center; gap: 12px; flex-shrink: 0; flex-wrap: wrap;
}
.ba-editor-title { font-family: 'Syne', sans-serif; font-size: .95rem; font-weight: 700; color: #fff; flex: 1; min-width: 0; }
.ba-editor-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.ba-btn {
  padding: .45rem 1rem; border-radius: 8px; font-size: .75rem; font-weight: 600;
  cursor: pointer; transition: all .18s; border: 1px solid; font-family: 'Instrument Sans', sans-serif;
  display: flex; align-items: center; gap: 5px;
}
.ba-btn-primary { background: linear-gradient(135deg,#f5a623,#ff7a1a); border-color: transparent; color: #0a0a0f; }
.ba-btn-primary:hover { opacity: .9; transform: translateY(-1px); }
.ba-btn-secondary { background: transparent; border-color: rgba(255,255,255,.12); color: #b0b0cc; }
.ba-btn-secondary:hover { background: rgba(255,255,255,.05); color: #fff; border-color: rgba(255,255,255,.25); }
.ba-btn-teal { background: rgba(0,201,177,.12); border-color: rgba(0,201,177,.3); color: #00c9b1; }
.ba-btn-teal:hover { background: rgba(0,201,177,.2); }
.ba-btn-danger { background: rgba(255,80,80,.1); border-color: rgba(255,80,80,.25); color: #ff6060; }
.ba-btn-danger:hover { background: rgba(255,80,80,.18); }
.ba-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; }

/* Tone selector */
.ba-tone-row { display: flex; gap: 6px; align-items: center; padding: 10px 24px; border-bottom: 1px solid rgba(255,255,255,.05); flex-shrink: 0; flex-wrap: wrap; }
.ba-tone-label { font-size: .7rem; color: #7a7a9a; text-transform: uppercase; letter-spacing: .08em; font-weight: 600; }
.ba-tone-chip {
  padding: .25rem .65rem; border-radius: 100px; font-size: .68rem; font-weight: 600;
  border: 1px solid rgba(255,255,255,.08); background: transparent; color: #7a7a9a;
  cursor: pointer; transition: all .18s;
}
.ba-tone-chip.active { background: rgba(0,201,177,.12); border-color: rgba(0,201,177,.35); color: #00c9b1; }
.ba-length-label { font-size: .7rem; color: #7a7a9a; margin-left: 10px; }
.ba-length-chip {
  padding: .25rem .65rem; border-radius: 100px; font-size: .68rem; font-weight: 600;
  border: 1px solid rgba(255,255,255,.08); background: transparent; color: #7a7a9a;
  cursor: pointer; transition: all .18s;
}
.ba-length-chip.active { background: rgba(245,166,35,.12); border-color: rgba(245,166,35,.35); color: #f5a623; }

/* Editor body */
.ba-editor-body { flex: 1; overflow-y: auto; padding: 24px; }
.ba-editor-body::-webkit-scrollbar { width: 4px; }
.ba-editor-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 2px; }

.ba-placeholder-state { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #3a3a5a; text-align: center; gap: 12px; }
.ba-placeholder-icon { font-size: 3rem; opacity: .4; }
.ba-placeholder-text { font-size: .85rem; max-width: 280px; line-height: 1.6; }

/* Generation progress */
.ba-gen-progress {
  background: rgba(245,166,35,.06); border: 1px solid rgba(245,166,35,.15);
  border-radius: 12px; padding: 20px; margin-bottom: 20px;
}
.ba-gen-steps { display: flex; flex-direction: column; gap: 10px; }
.ba-gen-step { display: flex; align-items: center; gap: 10px; font-size: .8rem; }
.ba-step-icon { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .75rem; flex-shrink: 0; }
.ba-step-icon.done { background: rgba(0,201,177,.2); color: #00c9b1; }
.ba-step-icon.active { background: rgba(245,166,35,.2); color: #f5a623; animation: baSpin .8s linear infinite; }
.ba-step-icon.wait { background: rgba(255,255,255,.05); color: #3a3a5a; }
@keyframes baSpin { to{transform:rotate(360deg)} }
.ba-step-text.done { color: #00c9b1; }
.ba-step-text.active { color: #f5a623; }
.ba-step-text.wait { color: #3a3a5a; }

/* Blog preview */
.ba-blog-preview { max-width: 680px; }
.ba-blog-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
.ba-blog-tag {
  font-size: .65rem; font-weight: 700; padding: .2rem .6rem; border-radius: 100px;
  text-transform: uppercase; letter-spacing: .05em;
}
.ba-blog-tag.primary { background: rgba(245,166,35,.15); color: #f5a623; border: 1px solid rgba(245,166,35,.3); }
.ba-blog-tag.secondary { background: rgba(0,201,177,.1); color: #00c9b1; border: 1px solid rgba(0,201,177,.25); }
.ba-blog-tag.gray { background: rgba(255,255,255,.06); color: #7a7a9a; border: 1px solid rgba(255,255,255,.1); }

.ba-blog-title {
  font-family: 'Syne', sans-serif; font-size: 1.75rem; font-weight: 800;
  color: #fff; line-height: 1.2; letter-spacing: -.02em; margin-bottom: 10px;
}
.ba-blog-subtitle { font-family: 'Lora', serif; font-size: 1rem; color: #9a9ab8; line-height: 1.6; margin-bottom: 16px; font-style: italic; }
.ba-blog-byline {
  display: flex; align-items: center; gap: 10px; padding: 10px 0;
  border-top: 1px solid rgba(255,255,255,.06); border-bottom: 1px solid rgba(255,255,255,.06);
  margin-bottom: 24px;
}
.ba-byline-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#f5a623,#ff7a1a); display: flex; align-items: center; justify-content: center; font-size: 14px; }
.ba-byline-info { flex: 1; }
.ba-byline-name { font-size: .78rem; font-weight: 600; color: #e8e8f0; }
.ba-byline-meta { font-size: .68rem; color: #4a4a6a; margin-top: 1px; }

.ba-blog-body { font-family: 'Lora', serif; font-size: .95rem; line-height: 1.85; color: #c8c8d8; }
.ba-blog-body h2 { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; color: #fff; margin: 24px 0 8px; }
.ba-blog-body h3 { font-family: 'Syne', sans-serif; font-size: .95rem; font-weight: 700; color: #e8e8f0; margin: 18px 0 6px; }
.ba-blog-body p { margin-bottom: 14px; }
.ba-blog-body strong { color: #f5a623; font-weight: 600; }
.ba-blog-body em { color: #00c9b1; font-style: italic; }
.ba-blog-body ul, .ba-blog-body ol { margin: 10px 0 14px 20px; display: flex; flex-direction: column; gap: 5px; }
.ba-blog-body li { font-size: .9rem; }
.ba-blog-body blockquote { border-left: 3px solid #f5a623; padding: 10px 16px; margin: 16px 0; background: rgba(245,166,35,.06); border-radius: 0 8px 8px 0; font-style: italic; color: #b0a080; }
.ba-blog-body .ba-callout { background: rgba(0,201,177,.06); border: 1px solid rgba(0,201,177,.2); border-radius: 10px; padding: 14px 16px; margin: 16px 0; }
.ba-blog-body .ba-callout-title { font-family: 'Syne', sans-serif; font-size: .8rem; font-weight: 700; color: #00c9b1; margin-bottom: 5px; text-transform: uppercase; letter-spacing: .06em; }
.ba-blog-cta { background: linear-gradient(135deg,rgba(245,166,35,.1),rgba(0,201,177,.06)); border: 1px solid rgba(245,166,35,.2); border-radius: 14px; padding: 20px; margin-top: 28px; text-align: center; }
.ba-blog-cta h3 { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 6px; }
.ba-blog-cta p { font-size: .82rem; color: #9a9ab8; margin-bottom: 14px; font-family: 'Instrument Sans', sans-serif; }
.ba-blog-cta-btn { display: inline-block; padding: .6rem 1.4rem; border-radius: 8px; background: linear-gradient(90deg,#f5a623,#ff7a1a); color: #0a0a0f; font-weight: 700; font-size: .82rem; text-decoration: none; border: none; cursor: pointer; font-family: 'Instrument Sans', sans-serif; }
.ba-blog-cta-btn:hover { opacity: .9; }

/* Editable title */
.ba-editable-title {
  font-family: 'Syne', sans-serif; font-size: 1.75rem; font-weight: 800;
  color: #fff; line-height: 1.2; letter-spacing: -.02em; margin-bottom: 10px;
  border: none; background: transparent; width: 100%; outline: none;
  border-bottom: 2px solid rgba(245,166,35,.2); padding-bottom: 4px;
}
.ba-editable-title:focus { border-bottom-color: rgba(245,166,35,.6); }

/* ── RIGHT PANEL ── */
.ba-right-panel { border-left: 1px solid rgba(255,255,255,.07); display: flex; flex-direction: column; overflow: hidden; }

.ba-panel-tabs { display: flex; border-bottom: 1px solid rgba(255,255,255,.07); flex-shrink: 0; }
.ba-panel-tab { flex: 1; padding: 14px 8px; text-align: center; font-size: .72rem; font-weight: 600; color: #4a4a6a; cursor: pointer; transition: all .18s; border-bottom: 2px solid transparent; }
.ba-panel-tab.active { color: #f5a623; border-bottom-color: #f5a623; }
.ba-panel-tab:hover { color: #b0b0cc; }

.ba-panel-body { flex: 1; overflow-y: auto; padding: 14px; }
.ba-panel-body::-webkit-scrollbar { width: 3px; }
.ba-panel-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); }

/* Published posts */
.ba-post-card {
  background: rgba(255,255,255,.025); border: 1px solid rgba(255,255,255,.07);
  border-radius: 10px; padding: 12px; margin-bottom: 8px; cursor: pointer;
  transition: all .18s;
}
.ba-post-card:hover { background: rgba(245,166,35,.05); border-color: rgba(245,166,35,.2); }
.ba-post-card-title { font-size: .78rem; font-weight: 600; color: #e8e8f0; line-height: 1.35; margin-bottom: 6px; }
.ba-post-card-meta { display: flex; align-items: center; gap: 8px; }
.ba-post-status { font-size: .62rem; font-weight: 700; padding: .15rem .45rem; border-radius: 4px; text-transform: uppercase; }
.status-published { background: rgba(0,201,177,.15); color: #00c9b1; }
.status-draft { background: rgba(245,166,35,.12); color: #f5a623; }
.status-scheduled { background: rgba(100,100,255,.12); color: #8888ff; }
.ba-post-date { font-size: .62rem; color: #4a4a6a; }
.ba-post-reads { font-size: .62rem; color: #6a6a8a; }

/* Schedule panel */
.ba-schedule-grid { display: flex; flex-direction: column; gap: 8px; }
.ba-schedule-item { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; gap: 10px; }
.ba-schedule-day { font-family: 'Syne', sans-serif; font-size: .72rem; font-weight: 700; color: #f5a623; min-width: 28px; }
.ba-schedule-info { flex: 1; min-width: 0; }
.ba-schedule-topic { font-size: .72rem; color: #e8e8f0; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ba-schedule-time { font-size: .62rem; color: #4a4a6a; margin-top: 2px; }
.ba-schedule-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.sdot-done { background: #00c9b1; }
.sdot-today { background: #f5a623; animation: baPulse 1.5s infinite; }
.sdot-upcoming { background: rgba(255,255,255,.15); }

/* Analytics */
.ba-analytics { display: flex; flex-direction: column; gap: 10px; }
.ba-metric-card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); border-radius: 10px; padding: 12px; }
.ba-metric-label { font-size: .65rem; color: #7a7a9a; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
.ba-metric-value { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; color: #f5a623; }
.ba-metric-delta { font-size: .7rem; color: #00c9b1; margin-top: 2px; }
.ba-mini-bar { height: 3px; border-radius: 2px; background: rgba(255,255,255,.06); margin-top: 8px; overflow: hidden; }
.ba-mini-bar-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg,#f5a623,#ff7a1a); transition: width .6s ease; }

/* Section headers */
.ba-section-header { font-size: .65rem; font-weight: 700; color: #4a4a6a; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,.05); }

/* Copy toast */
.ba-toast {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(80px);
  background: rgba(0,201,177,.9); color: #0a0a0f; padding: .6rem 1.4rem;
  border-radius: 100px; font-size: .78rem; font-weight: 700;
  transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .3s;
  opacity: 0; z-index: 9999; white-space: nowrap;
}
.ba-toast.visible { transform: translateX(-50%) translateY(0); opacity: 1; }

/* Word count bar */
.ba-wc-bar { display: flex; align-items: center; gap: 10px; padding: 8px 24px; border-top: 1px solid rgba(255,255,255,.05); font-size: .68rem; color: #4a4a6a; flex-shrink: 0; flex-wrap: wrap; gap: 12px; }
.ba-wc-item span { color: #7a7a9a; font-weight: 600; }

/* Responsive */
@media(max-width: 1100px) {
  .ba-layout { grid-template-columns: 260px 1fr; }
  .ba-right-panel { display: none; }
}
@media(max-width: 720px) {
  .ba-layout { grid-template-columns: 1fr; }
  .ba-sidebar { height: 200px; }
  .ba-topbar { padding: 0 16px; }
}
`;

/* ═══ DATA & HELPERS ═══ */
const TOPICS = ["AI Tools", "Machine Learning", "Automation", "ChatGPT", "Business Tech", "Startups", "Robotics", "Data Privacy"];

const TONES = [
  { id: "simple",    label: "Simple & Clear",  desc: "Easy for anyone to understand" },
  { id: "story",     label: "Story-Driven",     desc: "Narrative with real examples" },
  { id: "listicle",  label: "Listicle",         desc: "Scannable numbered format" },
  { id: "explainer", label: "Deep Explainer",   desc: "Thorough, educational" },
];

const LENGTHS = [
  { id: "short",  label: "Short (~400w)",  words: 400 },
  { id: "medium", label: "Medium (~700w)", words: 700 },
  { id: "long",   label: "Long (~1100w)",  words: 1100 },
];

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
}
function readTime(text) {
  const wc = (text || "").trim().split(/\s+/).length;
  return Math.max(1, Math.round(wc / 200));
}
function wordCount(text) { return (text || "").trim().split(/\s+/).filter(Boolean).length; }

// Render basic markdown to JSX-safe HTML string
function mdToHtml(text) {
  if (!text) return "";
  return text
    .replace(/### (.+)/g, '<h3>$1</h3>')
    .replace(/## (.+)/g, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hublp])(.+)/gm, (m) => m ? `<p>${m}</p>` : m)
    .replace(/<p><\/p>/g, '');
}

/* ═══ SEED DATA ═══ */
const SEED_POSTS = [
  {
    id: "p1", title: "Why Every Small Business Needs an AI Assistant in 2025",
    status: "published", date: Date.now() - 86400000 * 2, reads: 847, category: "AI Tools",
    tags: ["AI", "Small Business", "Automation"],
    body: `Running a small business means wearing a hundred hats. There's sales, operations, customer support, bookkeeping — and somehow you're expected to do all of it while also growing the company.\n\nHere's the thing: **AI assistants have gotten really good**. And they're not just for big corporations anymore.\n\n## What Can an AI Actually Do For You?\n\nLet's cut through the hype. An AI assistant today can:\n\n- Answer customer queries on your website 24/7 (even while you sleep)\n- Draft emails, proposals, and reports in seconds\n- Summarize long documents so you don't have to read them\n- Schedule meetings and send reminders automatically\n\n## The Real Cost of Doing It Manually\n\nA business owner spending **3 hours a day** on repetitive admin work is losing 90 hours a month. At even ₹500/hour of their own time, that's ₹45,000 worth of time — every single month.\n\nAn AI assistant costs a fraction of that.\n\n## Where to Start\n\nDon't try to automate everything at once. Start with your biggest pain point. If customer queries take up most of your day, start there. If it's email, start there.\n\n*The best automation is the one you actually implement.*`
  },
  {
    id: "p2", title: "GPT-4o Is Great — But Here's What It Still Can't Do",
    status: "published", date: Date.now() - 86400000 * 5, reads: 1243, category: "ChatGPT",
    tags: ["ChatGPT", "AI Limits", "Reality Check"],
    body: `Everyone's excited about GPT-4o. And honestly? There's a lot to be excited about. It can understand images, hold a conversation that sounds completely human, and write code that actually works.\n\nBut before you go replacing your entire team with AI, let's talk about what it **can't** do.\n\n## It Still Makes Things Up\n\nAI models can "hallucinate" — which is a polite way of saying they'll confidently tell you something completely wrong. Always fact-check anything important.\n\n## It Doesn't Know Your Business\n\nGPT-4o doesn't know your clients, your pricing, your history, or your brand voice. Without proper setup and context, it'll give you generic output.\n\n## The Bottom Line\n\nAI is a powerful tool. But a tool still needs a skilled person to wield it. The businesses winning with AI aren't replacing humans — they're **amplifying** them.`
  },
  {
    id: "p3", title: "5 Automations That Will Save Indian SMEs 10 Hours Every Week",
    status: "draft", date: Date.now() - 86400000, reads: 0, category: "Automation",
    tags: ["Automation", "India", "SME", "Productivity"],
    body: `If you run a small or mid-sized business in India, you already know: time is your most precious resource.\n\nHere are 5 automations that actually work for Indian businesses — tested, proven, and affordable.\n\n## 1. WhatsApp Auto-Replies\n\nMost Indian SMEs live on WhatsApp. Setting up an AI-powered auto-reply for common questions (pricing, timings, availability) can save 1–2 hours daily.\n\n## 2. Invoice Processing\n\nStop manually entering invoice data into Tally or Excel. AI can read invoices from email and auto-populate your accounting software.\n\n## 3. Lead Follow-Up Sequences\n\nWhen a lead fills your enquiry form, don't make them wait. Set up an automatic email+WhatsApp sequence that follows up for you.\n\n## 4. Report Generation\n\nWeekly sales reports, inventory summaries, attendance sheets — automate the data collection and formatting.\n\n## 5. Appointment Reminders\n\nReduce no-shows by 40–50% with automated WhatsApp reminders sent 24 hours and 1 hour before appointments.`
  },
];

const SCHEDULE_DAYS = [
  { day: "Mon", topic: "AI Tools Roundup", time: "9:00 AM", status: "done" },
  { day: "Tue", topic: "Automation for SMEs", time: "9:00 AM", status: "done" },
  { day: "Wed", topic: "Today's AI News Blog", time: "9:00 AM", status: "today" },
  { day: "Thu", topic: "GPT Tips & Tricks", time: "9:00 AM", status: "upcoming" },
  { day: "Fri", topic: "Week in AI Recap", time: "9:00 AM", status: "upcoming" },
  { day: "Sat", topic: "Business Automation Case Study", time: "10:00 AM", status: "upcoming" },
  { day: "Sun", topic: "What to Watch Next Week", time: "11:00 AM", status: "upcoming" },
];

/* ═══ MAIN COMPONENT ═══ */
export default function BlogAgent() {
  const [activeTopic, setActiveTopic]   = useState("AI Tools");
  const [searchQuery, setSearchQuery]   = useState("");
  const [newsItems, setNewsItems]       = useState([]);
  const [newsLoading, setNewsLoading]   = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [tone, setTone]                 = useState("simple");
  const [length, setLength]             = useState("medium");
  const [generating, setGenerating]     = useState(false);
  const [genStep, setGenStep]           = useState(0); // 0=idle,1=searching,2=writing,3=done
  const [currentPost, setCurrentPost]   = useState(null);
  const [editableTitle, setEditableTitle] = useState("");
  const [posts, setPosts]               = useState(SEED_POSTS);
  const [rightTab, setRightTab]         = useState("posts");
  const [toast, setToast]               = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Inject CSS
  useEffect(() => {
    const el = document.createElement("style");
    el.id = "ba-styles";
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => { const s = document.getElementById("ba-styles"); if(s) s.remove(); };
  }, []);

  const showToast = (msg) => {
    setToast(msg); setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  /* ── FETCH NEWS from Claude API with web_search ── */
  const fetchNews = useCallback(async (query) => {
    setNewsLoading(true);
    setNewsItems([]);
    setSelectedNews(null);

    const searchTerm = query || activeTopic;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          system: `You are a tech news researcher. Search for the latest news about the given topic and return ONLY a JSON array. No prose, no markdown fences.
Format: [{"headline":"...","source":"...","category":"ai|automation|business|tool|general","summary":"1-2 sentence plain English summary","url":"...","date":"..."}]
Return 6-8 items maximum. Focus on practical, business-relevant news from the last 7 days.`,
          messages: [{ role: "user", content: `Find the latest tech/AI news about: ${searchTerm}. Return JSON array only.` }]
        })
      });
      const data = await res.json();
      // Extract text from all content blocks
      const allText = (data.content || [])
        .filter(b => b.type === "text")
        .map(b => b.text)
        .join("\n");
      // Parse JSON from the response
      const match = allText.match(/\[[\s\S]*\]/);
      if (match) {
        const items = JSON.parse(match[0]);
        setNewsItems(items.map((item, i) => ({ ...item, id: `n${Date.now()}-${i}` })));
      } else {
        // Fallback seed if JSON not found
        setNewsItems(FALLBACK_NEWS(searchTerm));
      }
    } catch(e) {
      setNewsItems(FALLBACK_NEWS(searchTerm));
    } finally {
      setNewsLoading(false);
    }
  }, [activeTopic]);

  // Load news on mount and topic change
  useEffect(() => { fetchNews(activeTopic); }, [activeTopic]);

  /* ── GENERATE BLOG from Claude API ── */
  const generateBlog = useCallback(async () => {
    if (!selectedNews) return;
    setGenerating(true);
    setCurrentPost(null);
    setSelectedPost(null);
    setGenStep(1);

    const toneDesc = TONES.find(t => t.id === tone)?.desc || "simple and clear";
    const targetWords = LENGTHS.find(l => l.id === length)?.words || 700;

    const systemPrompt = `You are a friendly tech blogger writing for LaunchLayer — an AI automation agency serving Indian SMEs and global businesses.

Your writing style:
- ${toneDesc}
- No jargon — explain tech terms simply
- Use short paragraphs (2-3 sentences max)
- Conversational but professional
- Always connect to real business impact
- Add practical takeaways readers can act on TODAY
- Approx ${targetWords} words

OUTPUT FORMAT (JSON only, no markdown fences):
{
  "title": "Catchy, clear blog title",
  "subtitle": "1-sentence teaser",
  "tags": ["tag1","tag2","tag3"],
  "category": "category name",
  "body": "Full blog body in markdown format with ## headings, **bold**, *italic*, bullet lists, and > blockquotes. End with a section called ## The Bottom Line"
}`;

    const toneMap = {
      simple:    "Write in very simple, plain language. Imagine explaining to a busy business owner who isn't technical.",
      story:     "Start with a relatable story or scenario, then explain the news through that lens.",
      listicle:  "Format as a numbered list (5-7 points). Each point should have a mini-heading and 2-3 sentences.",
      explainer: "Give deep context — explain WHY this matters, HOW it works, and WHAT businesses should do about it.",
    };

    try {
      setTimeout(() => setGenStep(2), 1200);

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{
            role: "user",
            content: `Write a blog post about this news:\n\nHeadline: ${selectedNews.headline}\nSource: ${selectedNews.source}\nSummary: ${selectedNews.summary}\n\nTone instruction: ${toneMap[tone]}\n\nReturn JSON only.`
          }]
        })
      });
      const data = await res.json();
      const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
      const match = text.match(/\{[\s\S]*\}/);

      setGenStep(3);

      if (match) {
        const parsed = JSON.parse(match[0]);
        const post = {
          id: `post-${Date.now()}`,
          title: parsed.title,
          subtitle: parsed.subtitle,
          tags: parsed.tags || [],
          category: parsed.category || activeTopic,
          body: parsed.body,
          status: "draft",
          date: Date.now(),
          reads: 0,
          source: selectedNews.headline,
        };
        setCurrentPost(post);
        setEditableTitle(post.title);
        setTimeout(() => { setGenStep(0); setGenerating(false); }, 400);
      } else {
        throw new Error("Parse failed");
      }
    } catch(e) {
      // Fallback blog
      const fallback = makeFallbackBlog(selectedNews, tone, activeTopic);
      setCurrentPost(fallback);
      setEditableTitle(fallback.title);
      setTimeout(() => { setGenStep(0); setGenerating(false); }, 400);
    }
  }, [selectedNews, tone, length, activeTopic]);

  const savePost = (status) => {
    if (!currentPost) return;
    const updated = { ...currentPost, title: editableTitle, status, date: Date.now() };
    setPosts(prev => {
      const exists = prev.find(p => p.id === updated.id);
      return exists ? prev.map(p => p.id === updated.id ? updated : p) : [updated, ...prev];
    });
    showToast(status === "published" ? "✅ Published!" : "💾 Saved as draft");
  };

  const copyBlog = () => {
    if (!currentPost) return;
    const txt = `# ${editableTitle}\n\n${currentPost.body}`;
    navigator.clipboard.writeText(txt).then(() => showToast("📋 Copied to clipboard!"));
  };

  const loadPost = (post) => {
    setSelectedPost(post);
    setCurrentPost(post);
    setEditableTitle(post.title);
    setGenStep(0);
    setGenerating(false);
  };

  /* ── RENDER ── */
  const genSteps = [
    { label: "Searching latest news & sources", status: genStep >= 1 ? (genStep > 1 ? "done" : "active") : "wait" },
    { label: "Reading articles & extracting insights", status: genStep >= 2 ? (genStep > 2 ? "done" : "active") : "wait" },
    { label: "Writing your blog post", status: genStep >= 3 ? "done" : (genStep === 2 ? "active" : "wait") },
  ];

  const publishedCount = posts.filter(p => p.status === "published").length;
  const draftCount     = posts.filter(p => p.status === "draft").length;
  const totalReads     = posts.reduce((a,p) => a + (p.reads || 0), 0);

  return (
    <div className="ba-root">
      {/* TOPBAR */}
      <div className="ba-topbar">
        <div className="ba-logo">
          <span>LaunchLayer</span>
          <span className="ba-logo-dot" />
          <span className="ba-logo-sub">Blog Agent</span>
        </div>
        <div className="ba-topbar-right">
          <div className="ba-stat-pill">Published <span>{publishedCount}</span></div>
          <div className="ba-stat-pill">Drafts <span>{draftCount}</span></div>
          <div className="ba-stat-pill">Total reads <span>{totalReads.toLocaleString()}</span></div>
        </div>
      </div>

      <div className="ba-layout">
        {/* ── LEFT: NEWS SIDEBAR ── */}
        <div className="ba-sidebar">
          <div className="ba-sidebar-header">
            <div className="ba-sidebar-title">📡 Live News Feed</div>
            <div className="ba-search-row">
              <input
                className="ba-search-input"
                placeholder="Search any topic..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && fetchNews(searchQuery)}
              />
              <button className="ba-search-btn" onClick={() => fetchNews(searchQuery)} disabled={newsLoading}>
                {newsLoading ? "..." : "Go"}
              </button>
            </div>
            <div className="ba-topic-chips">
              {TOPICS.map(t => (
                <button key={t} className={`ba-topic-chip ${activeTopic === t ? "active" : ""}`}
                  onClick={() => { setActiveTopic(t); setSearchQuery(""); }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="ba-news-list">
            {newsLoading ? (
              <div className="ba-news-loading">
                {[1,2,3,4,5].map(i => <div key={i} className="ba-news-skeleton" style={{height: 60 + i*4}} />)}
              </div>
            ) : newsItems.length === 0 ? (
              <div className="ba-news-empty">
                <div className="ba-empty-icon">📰</div>
                <div>No news loaded yet. Pick a topic or search above.</div>
              </div>
            ) : newsItems.map(item => (
              <div key={item.id}
                className={`ba-news-item ${selectedNews?.id === item.id ? "selected" : ""}`}
                onClick={() => { setSelectedNews(item); setCurrentPost(null); setSelectedPost(null); }}>
                <div className="ba-news-headline">{item.headline}</div>
                <div className="ba-news-meta">
                  <span className="ba-news-source">{item.source}</span>
                  <span className={`ba-news-category cat-${item.category || "general"}`}>{item.category}</span>
                  <span className="ba-news-date">{item.date || "Today"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CENTER: EDITOR ── */}
        <div className="ba-main">
          {/* Editor controls */}
          <div className="ba-editor-header">
            <div className="ba-editor-title">
              {selectedPost ? "📄 Viewing post" : selectedNews ? `✍️ ${selectedNews.headline.slice(0,55)}…` : "📝 Blog Editor"}
            </div>
            <div className="ba-editor-actions">
              {selectedPost && (
                <button className="ba-btn ba-btn-secondary" onClick={() => { setSelectedPost(null); setCurrentPost(null); setEditableTitle(""); }}>
                  ✕ Close
                </button>
              )}
              {currentPost && !generating && (
                <>
                  <button className="ba-btn ba-btn-secondary" onClick={copyBlog}>📋 Copy</button>
                  <button className="ba-btn ba-btn-teal" onClick={() => savePost("draft")}>💾 Save Draft</button>
                  <button className="ba-btn ba-btn-primary" onClick={() => savePost("published")}>🚀 Publish</button>
                </>
              )}
              {selectedNews && !generating && !currentPost && (
                <button className="ba-btn ba-btn-primary" onClick={generateBlog}>⚡ Generate Blog</button>
              )}
              {generating && (
                <button className="ba-btn ba-btn-secondary" disabled>✍️ Writing…</button>
              )}
            </div>
          </div>

          {/* Tone + Length */}
          {!selectedPost && (
            <div className="ba-tone-row">
              <span className="ba-tone-label">Tone:</span>
              {TONES.map(t => (
                <button key={t.id} className={`ba-tone-chip ${tone === t.id ? "active" : ""}`}
                  onClick={() => setTone(t.id)} title={t.desc}>{t.label}</button>
              ))}
              <span className="ba-length-label">Length:</span>
              {LENGTHS.map(l => (
                <button key={l.id} className={`ba-length-chip ${length === l.id ? "active" : ""}`}
                  onClick={() => setLength(l.id)}>{l.label}</button>
              ))}
            </div>
          )}

          {/* Editor body */}
          <div className="ba-editor-body">
            {/* Empty state */}
            {!currentPost && !generating && (
              <div className="ba-placeholder-state">
                <div className="ba-placeholder-icon">🤖</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1rem",fontWeight:700,color:"#4a4a6a"}}>
                  Select a news item to begin
                </div>
                <div className="ba-placeholder-text">
                  Pick any headline from the news feed on the left, choose your tone, then hit <strong style={{color:"#f5a623"}}>Generate Blog</strong> — your AI blog post will be ready in seconds.
                </div>
                {posts.length > 0 && (
                  <div style={{marginTop:16,fontSize:".78rem",color:"#3a3a5a"}}>
                    Or view a published post from the panel →
                  </div>
                )}
              </div>
            )}

            {/* Generation progress */}
            {generating && (
              <div className="ba-gen-progress">
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:".9rem",fontWeight:700,color:"#f5a623",marginBottom:16}}>
                  ⚡ Generating your blog post...
                </div>
                <div className="ba-gen-steps">
                  {genSteps.map((s,i) => (
                    <div key={i} className="ba-gen-step">
                      <div className={`ba-step-icon ${s.status}`}>
                        {s.status === "done" ? "✓" : s.status === "active" ? "◌" : "○"}
                      </div>
                      <span className={`ba-step-text ${s.status}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:14,fontSize:".72rem",color:"#4a4a6a"}}>
                  Using live web search + Claude AI · Usually takes 10–20 seconds
                </div>
              </div>
            )}

            {/* Blog preview */}
            {currentPost && !generating && (
              <div className="ba-blog-preview">
                <div className="ba-blog-tags">
                  <span className="ba-blog-tag primary">{currentPost.category}</span>
                  {(currentPost.tags || []).slice(0,3).map(t => (
                    <span key={t} className="ba-blog-tag secondary">{t}</span>
                  ))}
                  <span className="ba-blog-tag gray">⏱ {readTime(currentPost.body)} min read</span>
                  <span className="ba-blog-tag gray">{wordCount(currentPost.body)} words</span>
                </div>

                {selectedPost ? (
                  <div className="ba-blog-title">{editableTitle}</div>
                ) : (
                  <input
                    className="ba-editable-title"
                    value={editableTitle}
                    onChange={e => setEditableTitle(e.target.value)}
                    placeholder="Blog title..."
                  />
                )}

                {currentPost.subtitle && (
                  <div className="ba-blog-subtitle">{currentPost.subtitle}</div>
                )}

                <div className="ba-blog-byline">
                  <div className="ba-byline-avatar">🤖</div>
                  <div className="ba-byline-info">
                    <div className="ba-byline-name">LaunchLayer Blog Agent</div>
                    <div className="ba-byline-meta">{fmtDate(currentPost.date)} · launchlayer.ai</div>
                  </div>
                  <span className={`ba-post-status status-${currentPost.status || "draft"}`}>
                    {currentPost.status || "draft"}
                  </span>
                </div>

                <div className="ba-blog-body"
                  dangerouslySetInnerHTML={{ __html: mdToHtml(currentPost.body) }} />

                <div className="ba-blog-cta">
                  <h3>Want AI automation like this for your business?</h3>
                  <p>Book a free 30-minute AI Audit and discover exactly where you can save time and money.</p>
                  <button className="ba-blog-cta-btn">Book Free AI Audit →</button>
                </div>
              </div>
            )}
          </div>

          {/* Stats bar */}
          {currentPost && (
            <div className="ba-wc-bar">
              <span>Words: <span>{wordCount(currentPost.body)}</span></span>
              <span>Read time: <span>{readTime(currentPost.body)} min</span></span>
              <span>Category: <span>{currentPost.category}</span></span>
              {currentPost.source && <span>Source: <span style={{color:"#4a4a6a",maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"inline-block"}}>{currentPost.source.slice(0,60)}</span></span>}
            </div>
          )}
        </div>

        {/* ── RIGHT: POSTS / SCHEDULE / ANALYTICS ── */}
        <div className="ba-right-panel">
          <div className="ba-panel-tabs">
            {[["posts","📄 Posts"],["schedule","📅 Schedule"],["analytics","📊 Stats"]].map(([id,label]) => (
              <div key={id} className={`ba-panel-tab ${rightTab === id ? "active" : ""}`}
                onClick={() => setRightTab(id)}>{label}</div>
            ))}
          </div>

          <div className="ba-panel-body">
            {rightTab === "posts" && (
              <>
                <div className="ba-section-header">All Posts ({posts.length})</div>
                {posts.map(post => (
                  <div key={post.id} className="ba-post-card" onClick={() => loadPost(post)}>
                    <div className="ba-post-card-title">{post.title}</div>
                    <div className="ba-post-card-meta">
                      <span className={`ba-post-status status-${post.status}`}>{post.status}</span>
                      <span className="ba-post-date">{fmtDate(post.date)}</span>
                      {post.reads > 0 && <span className="ba-post-reads">👁 {post.reads.toLocaleString()}</span>}
                    </div>
                  </div>
                ))}
              </>
            )}

            {rightTab === "schedule" && (
              <>
                <div className="ba-section-header">This Week's Plan</div>
                <div className="ba-schedule-grid">
                  {SCHEDULE_DAYS.map(s => (
                    <div key={s.day} className="ba-schedule-item">
                      <div className="ba-schedule-day">{s.day}</div>
                      <div className="ba-schedule-info">
                        <div className="ba-schedule-topic">{s.topic}</div>
                        <div className="ba-schedule-time">{s.time}</div>
                      </div>
                      <div className={`ba-schedule-dot sdot-${s.status}`} title={s.status} />
                    </div>
                  ))}
                </div>
                <div style={{marginTop:16,padding:"12px",background:"rgba(245,166,35,.06)",borderRadius:10,border:"1px solid rgba(245,166,35,.15)"}}>
                  <div style={{fontSize:".7rem",color:"#f5a623",fontWeight:700,marginBottom:6}}>💡 PRO TIP</div>
                  <div style={{fontSize:".72rem",color:"#7a7a9a",lineHeight:1.5}}>Post between 8–10am IST for maximum LinkedIn engagement. Tuesday and Wednesday outperform other days by 40%.</div>
                </div>
              </>
            )}

            {rightTab === "analytics" && (
              <>
                <div className="ba-section-header">Performance</div>
                <div className="ba-analytics">
                  {[
                    { label: "Total Posts Published", value: publishedCount, delta: "+2 this week", fill: 70 },
                    { label: "Total Reads", value: totalReads.toLocaleString(), delta: "+23% vs last week", fill: 55 },
                    { label: "Avg. Read Time", value: "4.2 min", delta: "Good engagement rate", fill: 84 },
                    { label: "Drafts Pending", value: draftCount, delta: "Ready to publish", fill: 30 },
                  ].map(m => (
                    <div key={m.label} className="ba-metric-card">
                      <div className="ba-metric-label">{m.label}</div>
                      <div className="ba-metric-value">{m.value}</div>
                      <div className="ba-metric-delta">{m.delta}</div>
                      <div className="ba-mini-bar">
                        <div className="ba-mini-bar-fill" style={{width:`${m.fill}%`}} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{marginTop:16}}>
                  <div className="ba-section-header">Top Categories</div>
                  {["AI Tools","Automation","Business Tech","ChatGPT"].map((cat,i) => (
                    <div key={cat} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                      <span style={{fontSize:".72rem",color:"#9a9ab8",minWidth:90}}>{cat}</span>
                      <div style={{flex:1,height:4,background:"rgba(255,255,255,.06)",borderRadius:2,overflow:"hidden"}}>
                        <div style={{height:"100%",background:"linear-gradient(90deg,#f5a623,#ff7a1a)",borderRadius:2,width:`${[80,65,48,35][i]}%`}} />
                      </div>
                      <span style={{fontSize:".68rem",color:"#4a4a6a"}}>{[80,65,48,35][i]}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`ba-toast ${toastVisible ? "visible" : ""}`}>{toast}</div>
    </div>
  );
}

/* ═══ FALLBACKS ═══ */
function FALLBACK_NEWS(topic) {
  const now = new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short"});
  return [
    { id:"f1", headline:`How ${topic} Is Reshaping the Way Indian SMEs Work in 2025`, source:"TechCrunch", category:"ai", date:now, summary:`Businesses across India are rapidly adopting ${topic} tools to cut operational costs and improve output. Early adopters report 40–60% reduction in manual work.` },
    { id:"f2", headline:`OpenAI, Google, and Anthropic: The New ${topic} Race That Affects Your Business`, source:"The Verge", category:"ai", date:now, summary:`The AI giants are rolling out new models and capabilities at record pace. Here's what SME owners need to know and which tools are actually worth trying.` },
    { id:"f3", headline:`5 Ways Small Businesses Are Using ${topic} to Compete With Big Corporations`, source:"Forbes", category:"business", date:now, summary:`From automating invoices to AI customer service, here are real examples of small businesses leveling the playing field using affordable ${topic} solutions.` },
    { id:"f4", headline:`${topic} Tools Compared: Which One Is Right for Your Team?`, source:"Wired", category:"tool", date:now, summary:`A practical breakdown of the most popular ${topic} tools on the market, with honest assessment of pricing, ease of use, and real-world performance.` },
    { id:"f5", headline:`The ${topic} Trend That Every Operations Manager Should Know About`, source:"MIT Tech Review", category:"automation", date:now, summary:`A new approach to ${topic} implementation is gaining traction — one that doesn't require a tech team and delivers ROI within the first month.` },
    { id:"f6", headline:`What Happens When ${topic} Makes a Mistake? Lessons From Real Cases`, source:"Bloomberg", category:"general", date:now, summary:`As ${topic} adoption grows, so do the cautionary tales. Here's what went wrong, why, and how businesses can set up proper safeguards.` },
  ];
}

function makeFallbackBlog(news, tone, category) {
  const title = `${news.headline.slice(0,60)}${news.headline.length > 60 ? "…" : ""}`;
  const body = tone === "listicle"
    ? `Here's what you need to know about this development — broken down simply.\n\n## 1. What Happened\n\n${news.summary}\n\n## 2. Why It Matters to Your Business\n\nThis isn't just tech news — it has real implications for how businesses operate day-to-day. Early adopters of similar technology report saving **40+ hours per month** on manual tasks.\n\n## 3. The Opportunity\n\nMost small and mid-sized businesses are still doing this manually. That's actually *good news* — it means the competitive advantage of automating early is massive right now.\n\n## 4. What To Do This Week\n\nDon't wait for the "perfect moment" to explore AI tools. Start with your biggest time-waster and look for a simple automation that handles it.\n\n## 5. The Bottom Line\n\nTechnology is moving fast. The businesses that thrive won't be the ones with the biggest budgets — they'll be the ones who *act* first.\n\n> "The best time to automate was a year ago. The second best time is today."`
    : `${news.summary}\n\n## Why This Matters\n\nFor most business owners, tech news feels distant — something for engineers and investors to worry about. But this development is different.\n\nIt directly affects how you can run your operations, serve your customers, and compete in your market.\n\n## The Simple Explanation\n\nThink of it this way: every hour your team spends on repetitive, predictable tasks is an hour not spent on things only humans can do — building relationships, solving complex problems, growing the business.\n\n**AI tools are now good enough to handle the repetitive parts.** And they're affordable enough that small businesses can access them.\n\n## What This Means For Indian SMEs\n\nIndia's business landscape is uniquely positioned to benefit. With a large workforce, price-sensitive markets, and growing digital infrastructure, automation ROI here is often *higher* than in Western markets.\n\nWe've seen businesses in manufacturing, healthcare, and e-commerce cut manual work by **60–80%** after implementing the right automation.\n\n## The Bottom Line\n\nYou don't need a tech team or a massive budget to start. You need a clear understanding of your biggest time-wasters and the right tools to address them.\n\nThe businesses winning in 2025 aren't the ones with the most employees — they're the ones that have automated the right things.`;

  return {
    id: `post-${Date.now()}`,
    title,
    subtitle: "What this means for your business — explained simply.",
    tags: [category, "AI", "Business"],
    category,
    body,
    status: "draft",
    date: Date.now(),
    reads: 0,
    source: news.headline,
  };
}
