import { useState, useEffect, useRef, useCallback } from "react";

/* ─── STYLES ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

.ll-chat-widget { position:fixed; bottom:28px; right:28px; z-index:9999; font-family:'Instrument Sans',sans-serif; }

/* Launcher button */
.ll-launcher {
  width:60px; height:60px; border-radius:50%; border:none; cursor:pointer;
  background:linear-gradient(135deg,#f5a623,#ff7a1a);
  box-shadow:0 4px 24px rgba(245,166,35,.45);
  display:flex; align-items:center; justify-content:center;
  transition:transform .2s,box-shadow .2s; position:relative;
}
.ll-launcher:hover { transform:scale(1.08); box-shadow:0 6px 32px rgba(245,166,35,.6); }
.ll-launcher svg { width:26px; height:26px; fill:#0a0a0f; transition:opacity .2s,transform .2s; }
.ll-launcher .icon-chat { position:absolute; }
.ll-launcher .icon-close { position:absolute; opacity:0; transform:rotate(-90deg); }
.ll-launcher.open .icon-chat { opacity:0; transform:rotate(90deg); }
.ll-launcher.open .icon-close { opacity:1; transform:rotate(0deg); }
.ll-badge {
  position:absolute; top:-4px; right:-4px; width:18px; height:18px;
  background:#00c9b1; border-radius:50%; border:2px solid #0a0a0f;
  font-size:10px; font-weight:700; color:#0a0a0f;
  display:flex; align-items:center; justify-content:center;
  animation:badgePop .3s ease;
}
@keyframes badgePop { from{transform:scale(0)} to{transform:scale(1)} }

/* Chat panel */
.ll-panel {
  position:absolute; bottom:76px; right:0;
  width:380px; height:580px;
  background:#0f0f17; border:1px solid rgba(255,255,255,.08);
  border-radius:20px; overflow:hidden;
  display:flex; flex-direction:column;
  box-shadow:0 20px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(245,166,35,.08);
  transform-origin:bottom right;
  animation:panelIn .25s cubic-bezier(.34,1.56,.64,1);
}
@keyframes panelIn {
  from{opacity:0;transform:scale(.85) translateY(12px)}
  to{opacity:1;transform:scale(1) translateY(0)}
}

/* Header */
.ll-header {
  padding:16px 18px; display:flex; align-items:center; gap:12px;
  background:linear-gradient(135deg,rgba(245,166,35,.12),rgba(0,201,177,.06));
  border-bottom:1px solid rgba(255,255,255,.07); flex-shrink:0;
}
.ll-avatar {
  width:40px; height:40px; border-radius:50%; flex-shrink:0;
  background:linear-gradient(135deg,#f5a623,#ff7a1a);
  display:flex; align-items:center; justify-content:center; font-size:18px;
  box-shadow:0 0 16px rgba(245,166,35,.35);
}
.ll-header-info { flex:1; min-width:0; }
.ll-header-name { font-family:'Syne',sans-serif; font-size:.95rem; font-weight:700; color:#fff; }
.ll-header-status { font-size:.72rem; color:#00c9b1; display:flex; align-items:center; gap:5px; margin-top:2px; }
.ll-status-dot { width:6px; height:6px; background:#00c9b1; border-radius:50%; animation:statusPulse 2s infinite; }
@keyframes statusPulse { 0%,100%{opacity:1} 50%{opacity:.4} }
.ll-header-actions { display:flex; gap:8px; }
.ll-header-btn {
  width:30px; height:30px; border-radius:8px; border:1px solid rgba(255,255,255,.1);
  background:transparent; cursor:pointer; color:rgba(255,255,255,.5);
  display:flex; align-items:center; justify-content:center; transition:all .2s; font-size:14px;
}
.ll-header-btn:hover { background:rgba(255,255,255,.06); color:#fff; }

/* Messages area */
.ll-messages {
  flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px;
  scroll-behavior:smooth;
}
.ll-messages::-webkit-scrollbar { width:4px; }
.ll-messages::-webkit-scrollbar-thumb { background:rgba(255,255,255,.1); border-radius:2px; }

/* Message bubbles */
.ll-msg { display:flex; gap:8px; animation:msgIn .22s ease; }
@keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.ll-msg.user { flex-direction:row-reverse; }
.ll-msg-avatar { width:28px; height:28px; border-radius:50%; flex-shrink:0; margin-top:2px; background:linear-gradient(135deg,#f5a623,#ff7a1a); display:flex; align-items:center; justify-content:center; font-size:13px; }
.ll-msg.user .ll-msg-avatar { background:rgba(255,255,255,.1); }
.ll-bubble {
  max-width:78%; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08);
  border-radius:16px 16px 16px 4px; padding:10px 14px;
  font-size:.84rem; color:#e8e8f0; line-height:1.55;
}
.ll-msg.user .ll-bubble {
  background:linear-gradient(135deg,rgba(245,166,35,.2),rgba(255,122,26,.15));
  border-color:rgba(245,166,35,.25); border-radius:16px 16px 4px 16px;
  color:#f0e8d8;
}
.ll-bubble strong { color:#f5a623; font-weight:600; }
.ll-bubble .ll-hl { color:#00c9b1; font-weight:600; }
.ll-bubble ul { margin:.5rem 0 0 1rem; display:flex; flex-direction:column; gap:3px; }
.ll-bubble li { font-size:.82rem; color:#9a9ab8; }
.ll-bubble li::marker { color:#f5a623; }
.ll-msg-time { font-size:.65rem; color:rgba(255,255,255,.25); margin-top:4px; text-align:right; }
.ll-msg.user .ll-msg-time { text-align:right; }

/* Typing indicator */
.ll-typing { display:flex; gap:8px; align-items:flex-end; }
.ll-typing-bubble { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08); border-radius:16px 16px 16px 4px; padding:12px 16px; display:flex; gap:5px; align-items:center; }
.ll-dot { width:6px; height:6px; border-radius:50%; background:#7a7a9a; animation:typingDot 1.2s infinite; }
.ll-dot:nth-child(2) { animation-delay:.2s; }
.ll-dot:nth-child(3) { animation-delay:.4s; }
@keyframes typingDot { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-5px);opacity:1} }

/* Rich cards */
.ll-card { background:rgba(245,166,35,.06); border:1px solid rgba(245,166,35,.2); border-radius:12px; padding:12px 14px; margin-top:6px; }
.ll-card-title { font-family:'Syne',sans-serif; font-size:.85rem; font-weight:700; color:#f5a623; margin-bottom:6px; }
.ll-card-row { display:flex; justify-content:space-between; align-items:center; padding:4px 0; border-bottom:1px solid rgba(255,255,255,.05); font-size:.78rem; }
.ll-card-row:last-child { border-bottom:none; }
.ll-card-row span:first-child { color:#9a9ab8; }
.ll-card-row span:last-child { color:#e8e8f0; font-weight:500; }
.ll-price-card { background:rgba(0,201,177,.06); border:1px solid rgba(0,201,177,.2); border-radius:12px; padding:12px 14px; margin-top:6px; }
.ll-price-big { font-family:'Syne',sans-serif; font-size:1.4rem; font-weight:800; color:#00c9b1; }
.ll-price-sub { font-size:.72rem; color:#7a7a9a; margin-top:2px; }
.ll-check-list { margin-top:8px; display:flex; flex-direction:column; gap:4px; }
.ll-check-item { font-size:.76rem; color:#9a9ab8; display:flex; align-items:flex-start; gap:6px; }
.ll-check-item::before { content:'✓'; color:#00c9b1; font-weight:700; flex-shrink:0; margin-top:1px; }

/* CTA button inside bubble */
.ll-cta-btn {
  display:inline-block; margin-top:10px; padding:.5rem 1rem; border-radius:8px;
  background:linear-gradient(90deg,#f5a623,#ff7a1a); color:#0a0a0f;
  font-size:.78rem; font-weight:700; text-decoration:none; border:none; cursor:pointer;
  transition:opacity .2s,transform .15s; font-family:'Instrument Sans',sans-serif;
}
.ll-cta-btn:hover { opacity:.9; transform:translateY(-1px); }

/* Quick replies */
.ll-chips { display:flex; flex-wrap:wrap; gap:6px; padding:10px 14px 2px; flex-shrink:0; }
.ll-chip {
  padding:.38rem .85rem; border-radius:100px;
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.12);
  color:#b0b0cc; font-size:.75rem; font-weight:500; cursor:pointer;
  transition:all .18s; white-space:nowrap;
}
.ll-chip:hover { background:rgba(245,166,35,.12); border-color:rgba(245,166,35,.4); color:#f5a623; transform:translateY(-1px); }

/* Input area */
.ll-input-area {
  padding:12px 14px 16px; border-top:1px solid rgba(255,255,255,.07);
  display:flex; gap:8px; align-items:center; flex-shrink:0;
  background:rgba(0,0,0,.2);
}
.ll-input {
  flex:1; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
  border-radius:12px; padding:.62rem 14px; color:#e8e8f0;
  font-family:'Instrument Sans',sans-serif; font-size:.84rem;
  outline:none; transition:border-color .2s; resize:none; max-height:80px;
}
.ll-input::placeholder { color:#4a4a6a; }
.ll-input:focus { border-color:rgba(245,166,35,.45); }
.ll-send {
  width:38px; height:38px; border-radius:10px; border:none;
  background:linear-gradient(135deg,#f5a623,#ff7a1a);
  cursor:pointer; display:flex; align-items:center; justify-content:center;
  transition:transform .15s,box-shadow .2s; flex-shrink:0;
}
.ll-send:hover { transform:scale(1.08); box-shadow:0 4px 16px rgba(245,166,35,.4); }
.ll-send:disabled { opacity:.4; cursor:not-allowed; transform:none; }
.ll-send svg { width:16px; height:16px; fill:#0a0a0f; }

/* Inline form */
.ll-form { display:flex; flex-direction:column; gap:8px; margin-top:8px; }
.ll-form-input {
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
  border-radius:8px; padding:.55rem 10px; color:#e8e8f0;
  font-family:'Instrument Sans',sans-serif; font-size:.8rem; outline:none;
  transition:border-color .2s; width:100%;
}
.ll-form-input:focus { border-color:rgba(245,166,35,.45); }
.ll-form-input::placeholder { color:#4a4a6a; }
.ll-form-submit {
  padding:.55rem 1rem; border-radius:8px; border:none;
  background:linear-gradient(90deg,#f5a623,#ff7a1a); color:#0a0a0f;
  font-size:.8rem; font-weight:700; cursor:pointer; font-family:'Instrument Sans',sans-serif;
  transition:opacity .2s;
}
.ll-form-submit:hover { opacity:.9; }

/* Footer tag */
.ll-footer-tag { text-align:center; padding:6px 0 10px; font-size:.65rem; color:#3a3a5a; }
.ll-footer-tag a { color:#4a4a7a; text-decoration:none; }

/* Responsive */
@media(max-width:440px){
  .ll-panel { width:calc(100vw - 24px); right:-14px; }
}
`;

/* ─── KNOWLEDGE BASE ─── */
const KB = {
  services: [
    { name: "AI Workflow Automation", desc: "n8n, Make.com, Zapier pipelines", icon: "🤖" },
    { name: "AI Chatbots & Assistants", desc: "WhatsApp, website, portal bots", icon: "💬" },
    { name: "Reporting & Analytics", desc: "Auto-dashboards, LLM analytics", icon: "📊" },
    { name: "Document Intelligence", desc: "Invoice OCR, PDF extraction", icon: "📄" },
    { name: "Systems Integration", desc: "CRM, ERP, API connectors", icon: "🔗" },
    { name: "Lead Gen Automation", desc: "AI funnels, email sequences", icon: "🚀" },
  ],
  pricing: [
    { plan: "Starter", price: "$30/hr", desc: "One-off automations, pay as you go", features: ["Single workflow build", "1–2 app integrations", "1 week support", "Free audit call"] },
    { plan: "Growth", price: "$400/mo", desc: "Best for growing SMEs", features: ["3 automations/month", "AI chatbot included", "ROI report", "Priority WhatsApp support", "₹33,000/mo Indian billing"] },
    { plan: "Enterprise", price: "Custom", desc: "Full AI transformation", features: ["Unlimited workflows", "Full ERP/CRM integration", "Custom LLM builds", "SLA-backed delivery", "NDAs & enterprise security"] },
  ],
  industries: ["Manufacturing & Supply Chain", "E-Commerce / D2C", "Healthcare & Clinics", "Finance / CA / Legal", "Real Estate", "EdTech & Coaching", "Logistics & 3PL", "HR & Recruitment"],
  process: [
    { step: "01", title: "Free AI Audit", desc: "30-min call to map your biggest automation wins" },
    { step: "02", title: "Build & Test", desc: "Live prototype in 5–10 business days, no long contracts" },
    { step: "03", title: "Go Live & Measure", desc: "Deploy, monitor ROI, then expand to next automation" },
  ],
  tools: ["n8n (FREE*)", "Make.com ($9/mo)", "GPT-4o", "Voiceflow", "Metabase", "Brevo", "Zapier", "Supabase", "Vercel"],
  contact: { email: "launchlayer.techh@gmail.com", whatsapp: "+91 98310 14716", regions: "India 🇮🇳 · UAE 🇦🇪 · UK 🇬🇧 · USA 🇺🇸 · Australia 🇦🇺" },
  stats: ["200+ hours saved per client/month", "70% cost reduction on manual tasks", "$30/hr starting rate", "2 weeks to first live automation"],
};

/* ─── RESPONSE ENGINE ─── */
function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function buildMsg(content, isBot = true, chips = [], type = "text") {
  return { id: Date.now() + Math.random(), content, isBot, chips, type, time: getTime() };
}

const RULES = [
  {
    match: /\b(hi|hello|hey|hiya|sup|start|begin)\b/i,
    respond: () => ({
      text: `Hey there! 👋 I'm **Laya**, LaunchLayer's AI assistant.\n\nI can help you with:\n- Our services & pricing\n- How AI automation works\n- Booking a free audit\n- Anything about your business challenges\n\nWhat would you like to explore?`,
      chips: ["🔧 Our Services", "💰 Pricing", "📞 Book Free Audit", "🏭 Industries We Serve"],
    }),
  },
  {
    match: /\b(service|what.*(you|we) do|offer|automation|workflow)\b/i,
    respond: () => ({
      text: `We offer **6 core AI automation services** — all designed to eliminate manual work and save your team hours every week:`,
      card: "services",
      chips: ["💰 See Pricing", "🏭 Which industry?", "📞 Book Free Audit", "⚙️ How it works"],
    }),
  },
  {
    match: /\b(price|pricing|cost|how much|rate|charge|fee|₹|inr|usd)\b/i,
    respond: () => ({
      text: `We have **3 simple plans** — no lock-ins, no surprises:`,
      card: "pricing",
      chips: ["🚀 Start with Starter", "📈 Tell me about Growth", "🏢 Enterprise options", "📞 Book Free Audit"],
    }),
  },
  {
    match: /\bstarter\b/i,
    respond: () => ({
      text: `**Starter — $30/hour**\n\nPerfect if you want to dip your toes in with no commitment.\n\n✓ Single workflow automation\n✓ 1–2 app integrations\n✓ Testing & handover docs\n✓ 1 week post-launch support\n✓ Free 30-min audit call included\n\nMost clients start here and upgrade to Growth within 2 months after seeing the ROI.`,
      chips: ["📈 Compare Growth plan", "📞 Book Free Audit", "💬 Talk to team"],
    }),
  },
  {
    match: /\bgrowth\b/i,
    respond: () => ({
      text: `**Growth — $400/month** (₹33,000/mo for India 🇮🇳)\n\n10–20 hrs/month of dedicated automation + consulting. Our most popular plan.\n\n✓ Up to 3 workflow automations/month\n✓ AI chatbot setup & management\n✓ Monthly ROI report\n✓ Priority WhatsApp support\n✓ Dedicated solutions consultant\n\nMost clients save **40+ hours/month** — that's over $2,000 of staff time for $400.`,
      chips: ["🏢 Enterprise options", "📞 Book Free Audit", "🔧 What's included"],
    }),
  },
  {
    match: /\benterprise\b/i,
    respond: () => ({
      text: `**Enterprise — Custom Pricing**\n\nFull-stack AI transformation for businesses with complex, multi-system workflows.\n\n✓ Unlimited workflow scope\n✓ Full ERP/CRM/API integration\n✓ Custom AI agents & LLM builds\n✓ Dedicated team pod\n✓ SLA-backed delivery\n✓ NDAs & enterprise security\n\nLet's talk. We'll assess your needs and give you a custom proposal.`,
      chips: ["📞 Book a call", "✉️ Email us", "💰 Other plans"],
    }),
  },
  {
    match: /\b(industry|sector|manufacturing|ecommerce|e-commerce|healthcare|finance|real estate|edtech|logistics|hr|recruitment|ca|legal)\b/i,
    respond: () => ({
      text: `We serve businesses across **8 key industries** where manual work is highest and AI ROI is fastest:\n\n🏭 Manufacturing & Supply Chain\n🛒 E-Commerce / D2C\n🏥 Healthcare & Clinics\n🏦 Finance, CA & Legal\n🏠 Real Estate\n🎓 EdTech & Coaching\n🚚 Logistics & 3PL\n🧑‍💼 HR & Recruitment\n\nWhich one is closest to your business?`,
      chips: ["🏭 Manufacturing", "🛒 E-Commerce", "🏥 Healthcare", "🏠 Real Estate"],
    }),
  },
  {
    match: /\bmanufacturing\b/i,
    respond: () => ({
      text: `**Manufacturing & Supply Chain** is one of our strongest areas. 🏭\n\nA real client case: A Mumbai trading company had **3 staff spending 4hrs/day** copying PO data from emails to Excel and ERP.\n\nWe automated it → **processing time dropped from 3 hours to 5 minutes**. Those same staff now handle 3× more client accounts.\n\n**Common automations:** PO processing, inventory tracking, supplier comms, quality alerts, invoice extraction.`,
      chips: ["📊 See the ROI", "📞 Book Free Audit", "🔧 Our services"],
    }),
  },
  {
    match: /\b(ecommerce|e-commerce|d2c|shop|store|order)\b/i,
    respond: () => ({
      text: `**E-Commerce & D2C** automation is huge ROI territory. 🛒\n\nReal case: A D2C brand getting 200+ orders/day had 2 support agents drowning in messages. Response time was 12+ hours.\n\nWe deployed an AI chatbot → **80% of queries resolved automatically** in under 2 minutes. Support rating jumped to 4.8★.\n\n**Common automations:** Customer support bot, order tracking, returns processing, review management, inventory alerts.`,
      chips: ["💰 See pricing", "📞 Book Free Audit", "🏭 Other industries"],
    }),
  },
  {
    match: /\b(healthcare|clinic|hospital|patient|appointment|doctor)\b/i,
    respond: () => ({
      text: `**Healthcare & Clinics** — one of our fastest-growing segments. 🏥\n\nReal case: A clinic had a receptionist spending **4 hours/day just on appointment reminders**, with 30% no-shows anyway.\n\nWe deployed a WhatsApp AI → **no-shows dropped 45%**, receptionist freed up 4 hrs/day, patients get 24/7 support.\n\n**Common automations:** Appointment reminders, patient FAQ bot, prescription follow-ups, billing workflows.`,
      chips: ["💰 See pricing", "📞 Book Free Audit", "🔧 Our services"],
    }),
  },
  {
    match: /\b(real estate|property|lead|enquir)\b/i,
    respond: () => ({
      text: `**Real Estate** AI automation is a lead-gen game-changer. 🏠\n\nReal case: A UK/UAE agency got 200 enquiries/month but agents could only call 40. The rest went cold.\n\nWe built an AI funnel → instant response to every enquiry, AI qualification, only the **top 30% passed to agents**. Conversion uplift: **28%**.\n\n**Common automations:** Lead qualification, WhatsApp nurture, property matching, CRM automation.`,
      chips: ["💰 See pricing", "📞 Book Free Audit", "🔧 All services"],
    }),
  },
  {
    match: /\b(how.*(work|process|step)|process|timeline|how long|start)\b/i,
    respond: () => ({
      text: `Our process is **fast and low-risk**. Most clients see a live automation within 2 weeks:\n\n**01 — Free AI Audit (30 mins)**\nWe map your biggest automation wins. You get an "automation priority map" even if you don't hire us.\n\n**02 — Build & Test (1–2 weeks)**\nLive prototype using proven tools (n8n, GPT-4o, Make.com). No big upfront, no long contracts.\n\n**03 — Go Live & Measure ROI**\nWe deploy, monitor, report. Happy? We expand to the next automation.\n\nYou only pay for **real, working results**.`,
      chips: ["📞 Start with Free Audit", "💰 Pricing", "🔧 Tools we use"],
    }),
  },
  {
    match: /\b(tool|tech|stack|n8n|make\.com|zapier|gpt|openai|software)\b/i,
    respond: () => ({
      text: `We use a **cost-smart AI stack** that delivers enterprise results at startup prices:\n\n🔧 **n8n** — Core automation (FREE, self-hosted)\n⚙️ **Make.com** — $9/mo\n🤖 **GPT-4o** — Pay per use\n💬 **Voiceflow** — Chatbot builder\n📊 **Metabase** — Analytics dashboards\n📧 **Brevo** — Email automation\n🔌 **Zapier** — Quick integrations\n📦 **Supabase** — Database\n☁️ **Vercel** — Hosting\n\nn8n alone replaces tools costing $500+/mo at just $5/mo self-hosted.`,
      chips: ["💰 Pricing", "📞 Book Free Audit", "🔧 Our services"],
    }),
  },
  {
    match: /\b(roi|save|saving|hour|time|cost|benefit|result|impact)\b/i,
    respond: () => ({
      text: `Here's what our clients typically see:\n\n📊 **200+ hours** saved per client/month\n💰 **70% cost reduction** on manual tasks\n⚡ **2 weeks** to first live automation\n📈 **3×** more output from the same team\n\nThe Growth plan costs $400/month. A single staff member spending 40 hrs/month on manual tasks costs $1,200–$2,000+ in salary. The math is clear. 🎯`,
      chips: ["💰 See pricing", "📞 Book Free Audit", "📊 Real case studies"],
    }),
  },
  {
    match: /\b(case study|example|result|success|client|testimonial|proof)\b/i,
    respond: () => ({
      text: `Here are **3 real results** from our clients:\n\n**🏭 Manufacturing (Mumbai)**\nPO processing: 3 hrs → 5 mins. ₹4L/year labour cost saved.\n\n**🏥 Healthcare Clinic**\nNo-shows reduced 45%. Receptionist freed 4hrs/day. 24/7 patient support.\n\n**🛒 E-Commerce D2C**\n80% queries auto-resolved. Response: 12hrs → 2min. Rating: 4.8★\n\n**🏠 Real Estate (UK/UAE)**\n3× more leads worked. 60% agent time saved. 28% conversion uplift.`,
      chips: ["📞 Book Free Audit", "💰 Pricing", "🔧 Our services"],
    }),
  },
  {
    match: /\b(contact|reach|email|phone|whatsapp|call|talk|speak)\b/i,
    respond: () => ({
      text: `You can reach us through:\n\n📧 **Email**\nlaunchlayer.techh@gmail.com\n\n💬 **WhatsApp (India)**\n+91 98310 14716\n\n🌍 **We serve**\nIndia · UAE · UK · USA · Australia\n\nOr book your **free 30-minute AI Audit** — no sales pitch, just a clear roadmap of where AI can save you time and money.`,
      chips: ["📞 Book Free Audit", "✉️ Email us", "💬 WhatsApp"],
    }),
  },
  {
    match: /\b(book|audit|free|schedule|appointment|demo|call me|consult)\b/i,
    respond: () => ({
      text: `Let's book your **Free 30-min AI Audit**! 🎯\n\nIn this call we'll:\n✓ Map your current manual workflows\n✓ Identify your top 3 automation opportunities\n✓ Give you an "automation priority map"\n✓ Estimate time & cost savings\n\n*No sales pressure. You get value even if you don't hire us.*\n\nFill in the quick form on the page, or drop your details here and we'll reach out within 24 hours:`,
      form: true,
      chips: ["✉️ Email us instead", "💬 WhatsApp us"],
    }),
  },
  {
    match: /\b(whatsapp)\b/i,
    respond: () => ({
      text: `Chat with us directly on WhatsApp! 💬\n\n**+91 98310 14716**\n\nWe typically respond within a few hours during business hours (IST). You can also message us anytime and we'll get back to you.`,
      chips: ["📞 Book Free Audit", "✉️ Email us"],
    }),
  },
  {
    match: /\b(india|indian|mumbai|bangalore|delhi|pune|hyderabad|rupee|inr)\b/i,
    respond: () => ({
      text: `We're **India-first** with global reach! 🇮🇳\n\nFor Indian clients:\n• **Indian billing available** — ₹33,000/month for Growth plan\n• WhatsApp-first communication\n• Tally, Zoho, GST-aware integrations\n• Strong presence in Manufacturing, CA/Legal, E-Commerce\n\nWe've worked with SMEs in Mumbai, Bangalore, Pune, and beyond. We understand the Indian business context deeply.`,
      chips: ["💰 Indian pricing", "📞 Book Free Audit", "🏭 Industries"],
    }),
  },
  {
    match: /\b(chatbot|bot|assistant|ai agent|virtual)\b/i,
    respond: () => ({
      text: `AI Chatbots & Virtual Assistants are one of our specialties! 💬\n\nWe build bots for:\n• **WhatsApp** — customer support, lead qual, appointment booking\n• **Website** — live chat, FAQ, product discovery\n• **Internal portals** — HR queries, IT helpdesk, knowledge base\n\nPowered by **GPT-4o or Claude** — so they actually understand context, not just keywords.\n\nMost chatbots we deploy handle **60–85% of queries automatically**.`,
      chips: ["💰 Chatbot pricing", "📊 See case study", "📞 Book Free Audit"],
    }),
  },
  {
    match: /\b(invoice|ocr|document|pdf|extract|scan)\b/i,
    respond: () => ({
      text: `**Document Intelligence & OCR** — one of the fastest ROI services we offer. 📄\n\nWe can automatically extract data from:\n• Invoices & purchase orders\n• PDF forms & contracts\n• Scanned documents\n• WhatsApp images of receipts\n\nThe extracted data flows directly into your ERP, accounting software (Tally, Zoho Books, QuickBooks), or spreadsheets — **zero manual keying**.\n\nTypical result: what took 3 hours/day → under 10 minutes.`,
      chips: ["💰 Pricing", "📞 Book Free Audit", "🔧 More services"],
    }),
  },
  {
    match: /\b(thank|thanks|great|awesome|perfect|nice|good|helpful)\b/i,
    respond: () => ({
      text: `Happy to help! 😊 Is there anything else you'd like to know about LaunchLayer or AI automation for your business?\n\nIf you're ready to take the next step, the **free 30-min AI Audit** is the best place to start — zero commitment, just clarity.`,
      chips: ["📞 Book Free Audit", "💰 Pricing", "🔧 Services"],
    }),
  },
  {
    match: /\b(bye|goodbye|see you|later|ciao|done)\b/i,
    respond: () => ({
      text: `Thanks for chatting! 👋\n\nWhenever you're ready to automate your business, we're here. The **free AI Audit** is always open — just come back and type "Book Audit".\n\nHave a great day! 🚀`,
      chips: ["📞 Book Free Audit"],
    }),
  },
];

const FALLBACK = () => ({
  text: `That's a great question — let me help point you in the right direction.\n\nHere are the things I know most about:`,
  chips: ["🔧 Our Services", "💰 Pricing", "🏭 Industries", "⚙️ How It Works", "📞 Book Free Audit", "📊 Case Studies"],
});

function getResponse(input) {
  const trimmed = input.trim().toLowerCase();
  for (const rule of RULES) {
    if (rule.match.test(trimmed)) return rule.respond();
  }
  return FALLBACK();
}

/* ─── WELCOME MESSAGES ─── */
const WELCOME = [
  { text: `Hi there! 👋 I'm **Laya**, LaunchLayer's AI assistant.\n\nI'm here to help you discover how AI automation can save your business **hundreds of hours** every month.\n\nWhat can I help you with today?`, chips: ["🔧 Our Services", "💰 Pricing Plans", "📞 Book Free Audit", "📊 Real Results"] },
];

/* ─── COMPONENT ─── */
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chips, setChips] = useState(WELCOME[0].chips);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [formState, setFormState] = useState(null); // null | {name,email,company}
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });
  const [formSent, setFormSent] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Inject CSS
  useEffect(() => {
    const el = document.createElement("style");
    el.id = "ll-chatbot-css";
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => { const s = document.getElementById("ll-chatbot-css"); if (s) s.remove(); };
  }, []);

  // Welcome message
  useEffect(() => {
    setTimeout(() => {
      setMessages([buildMsg(WELCOME[0].text, true, WELCOME[0].chips)]);
    }, 600);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    const userMsg = buildMsg(text, false);
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setChips([]);
    setTyping(true);

    // Handle form-related chip triggers
    if (text === "✉️ Email us") {
      setTimeout(() => {
        setTyping(false);
        const resp = buildMsg(`Drop us a line anytime at:\n\n📧 **launchlayer.techh@gmail.com**\n\nWe typically reply within a few hours during business hours.`, true, ["📞 Book Free Audit", "💬 WhatsApp us"]);
        setMessages(prev => [...prev, resp]);
        setChips(["📞 Book Free Audit", "💬 WhatsApp us"]);
      }, 900);
      return;
    }

    if (text === "💬 WhatsApp us") {
      setTimeout(() => {
        setTyping(false);
        const resp = buildMsg(`Message us on WhatsApp anytime! 💬\n\n**+91 98310 14716**\n\nUsually respond within a few hours (IST business hours).`, true, ["📞 Book Free Audit", "🔧 Our services"]);
        setMessages(prev => [...prev, resp]);
        setChips(["📞 Book Free Audit", "🔧 Our services"]);
      }, 900);
      return;
    }

    // Strip emoji prefix from chip labels for matching
    const cleanText = text.replace(/^[^\w₹$]+/, "").trim();
    const response = getResponse(cleanText || text);

    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      setTyping(false);
      const botMsg = buildMsg(response.text, true, response.chips || [], response.card || "text");
      setMessages(prev => [...prev, botMsg]);
      setChips(response.chips || []);
      if (response.form && !formSent) {
        setFormState({ active: true });
      }
    }, delay);
  }, [formSent]);

  const handleSend = () => { if (input.trim()) sendMessage(input); };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleChip = (chip) => { sendMessage(chip); };

  const handleOpen = () => {
    setOpen(true);
    setUnread(0);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email) return;
    setFormSent(true);
    setFormState(null);
    const confirmMsg = buildMsg(`Thanks **${formData.name}**! ✅\n\nWe've got your details and will reach out to **${formData.email}** within 24 hours to schedule your free AI Audit.\n\nIn the meantime, feel free to explore more about our services or just chat! 😊`, true, ["🔧 Our services", "💰 Pricing"]);
    setMessages(prev => [...prev, confirmMsg]);
    setChips(["🔧 Our services", "💰 Pricing"]);
  };

  /* ─── RENDER HELPERS ─── */
  function renderText(text) {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  }

  function renderCard(type) {
    if (type === "services") {
      return (
        <div className="ll-card" style={{ marginTop: 8 }}>
          <div className="ll-card-title">🔧 Our Services</div>
          {KB.services.map(s => (
            <div className="ll-card-row" key={s.name}>
              <span>{s.icon} {s.name}</span>
              <span style={{ color: "#7a7a9a", fontSize: ".72rem" }}>{s.desc}</span>
            </div>
          ))}
        </div>
      );
    }
    if (type === "pricing") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {KB.pricing.map(p => (
            <div className="ll-price-card" key={p.plan}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="ll-card-title" style={{ color: "#00c9b1", marginBottom: 2 }}>{p.plan}</div>
                  <div style={{ fontSize: ".72rem", color: "#7a7a9a" }}>{p.desc}</div>
                </div>
                <div className="ll-price-big">{p.price}</div>
              </div>
              <div className="ll-check-list">
                {p.features.slice(0, 3).map(f => <div className="ll-check-item" key={f}>{f}</div>)}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  function renderBubbleContent(msg) {
    return (
      <>
        <div style={{ whiteSpace: "pre-line" }}>{renderText(msg.content)}</div>
        {msg.type && msg.type !== "text" && renderCard(msg.type)}
        {msg.isBot && (
          <a className="ll-cta-btn" href="#contact" onClick={() => setOpen(false)}
            style={{ display: "inline-block", marginTop: 10 }}>
            📞 Book Free Audit →
          </a>
        )}
      </>
    );
  }

  return (
    <div className="ll-chat-widget">
      {/* Panel */}
      {open && (
        <div className="ll-panel">
          {/* Header */}
          <div className="ll-header">
            <div className="ll-avatar">🤖</div>
            <div className="ll-header-info">
              <div className="ll-header-name">Laya — LaunchLayer AI</div>
              <div className="ll-header-status">
                <span className="ll-status-dot" /> Online · Typically replies instantly
              </div>
            </div>
            <div className="ll-header-actions">
              <button className="ll-header-btn" title="Minimize" onClick={() => setOpen(false)}>—</button>
            </div>
          </div>

          {/* Messages */}
          <div className="ll-messages">
            {messages.map(msg => (
              <div className={`ll-msg ${msg.isBot ? "" : "user"}`} key={msg.id}>
                <div className="ll-msg-avatar">{msg.isBot ? "🤖" : "👤"}</div>
                <div>
                  <div className="ll-bubble">{renderBubbleContent(msg)}</div>
                  <div className="ll-msg-time">{msg.time}</div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="ll-typing">
                <div className="ll-msg-avatar">🤖</div>
                <div className="ll-typing-bubble">
                  <span className="ll-dot" /><span className="ll-dot" /><span className="ll-dot" />
                </div>
              </div>
            )}

            {/* Inline lead form */}
            {formState?.active && !formSent && (
              <div className="ll-msg">
                <div className="ll-msg-avatar">🤖</div>
                <div>
                  <div className="ll-bubble">
                    <div style={{ marginBottom: 8, fontSize: ".82rem" }}>Quick form — we'll reach out within <strong>24 hours</strong>:</div>
                    <div className="ll-form">
                      <input className="ll-form-input" placeholder="Your name *" value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                      <input className="ll-form-input" type="email" placeholder="Email address *" value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                      <input className="ll-form-input" placeholder="Company / Business name" value={formData.company}
                        onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} />
                      <button className="ll-form-submit" onClick={handleFormSubmit}>
                        Book Free 30-min Audit →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Chips */}
          {chips.length > 0 && (
            <div className="ll-chips">
              {chips.map(c => (
                <button className="ll-chip" key={c} onClick={() => handleChip(c)}>{c}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="ll-input-area">
            <textarea
              ref={inputRef}
              className="ll-input"
              placeholder="Ask me anything about AI automation..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
            />
            <button className="ll-send" onClick={handleSend} disabled={!input.trim()}>
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>

          <div className="ll-footer-tag">Powered by <a href="#">LaunchLayer AI</a></div>
        </div>
      )}

      {/* Launcher button */}
      <button className={`ll-launcher ${open ? "open" : ""}`} onClick={open ? () => setOpen(false) : handleOpen} aria-label="Chat with us">
        {/* Chat icon */}
        <svg className="icon-chat" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
        {/* Close icon */}
        <svg className="icon-close" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
        {!open && unread > 0 && <span className="ll-badge">{unread}</span>}
      </button>
    </div>
  );
}
