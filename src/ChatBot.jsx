import { useState, useEffect, useRef, useCallback } from "react";

/* ─── STYLES ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

.ll-chat-widget { position:fixed; bottom:28px; right:28px; z-index:9999; font-family:'Instrument Sans',sans-serif; }
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
}
.ll-panel {
  position:absolute; bottom:76px; right:0;
  width:380px; height:580px;
  background:#0f0f17; border:1px solid rgba(255,255,255,.08);
  border-radius:20px; overflow:hidden;
  display:flex; flex-direction:column;
  box-shadow:0 20px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(245,166,35,.08);
  transform-origin:bottom right;
  animation:llPanelIn .25s cubic-bezier(.34,1.56,.64,1);
}
@keyframes llPanelIn {
  from{opacity:0;transform:scale(.85) translateY(12px)}
  to{opacity:1;transform:scale(1) translateY(0)}
}
.ll-header {
  padding:16px 18px; display:flex; align-items:center; gap:12px;
  background:linear-gradient(135deg,rgba(245,166,35,.12),rgba(0,201,177,.06));
  border-bottom:1px solid rgba(255,255,255,.07); flex-shrink:0;
}
.ll-avatar {
  width:40px; height:40px; border-radius:50%; flex-shrink:0;
  background:linear-gradient(135deg,#f5a623,#ff7a1a);
  display:flex; align-items:center; justify-content:center; font-size:18px;
}
.ll-header-info { flex:1; min-width:0; }
.ll-header-name { font-family:'Syne',sans-serif; font-size:.95rem; font-weight:700; color:#fff; }
.ll-header-status { font-size:.72rem; color:#00c9b1; display:flex; align-items:center; gap:5px; margin-top:2px; }
.ll-status-dot { width:6px; height:6px; background:#00c9b1; border-radius:50%; animation:llPulse 2s infinite; }
@keyframes llPulse { 0%,100%{opacity:1} 50%{opacity:.4} }
.ll-header-btn {
  width:30px; height:30px; border-radius:8px; border:1px solid rgba(255,255,255,.1);
  background:transparent; cursor:pointer; color:rgba(255,255,255,.5);
  display:flex; align-items:center; justify-content:center; font-size:14px;
}
.ll-header-btn:hover { background:rgba(255,255,255,.06); color:#fff; }
.ll-messages {
  flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px;
}
.ll-messages::-webkit-scrollbar { width:4px; }
.ll-messages::-webkit-scrollbar-thumb { background:rgba(255,255,255,.1); border-radius:2px; }
.ll-msg { display:flex; gap:8px; animation:llMsgIn .22s ease; }
@keyframes llMsgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.ll-msg.user { flex-direction:row-reverse; }
.ll-msg-avatar {
  width:28px; height:28px; border-radius:50%; flex-shrink:0; margin-top:2px;
  background:linear-gradient(135deg,#f5a623,#ff7a1a);
  display:flex; align-items:center; justify-content:center; font-size:13px;
}
.ll-msg.user .ll-msg-avatar { background:rgba(255,255,255,.1); }
.ll-bubble {
  max-width:78%; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08);
  border-radius:16px 16px 16px 4px; padding:10px 14px;
  font-size:.84rem; color:#e8e8f0; line-height:1.55;
}
.ll-msg.user .ll-bubble {
  background:linear-gradient(135deg,rgba(245,166,35,.2),rgba(255,122,26,.15));
  border-color:rgba(245,166,35,.25); border-radius:16px 16px 4px 16px;
}
.ll-bubble strong { color:#f5a623; font-weight:600; }
.ll-typing { display:flex; gap:8px; align-items:flex-end; }
.ll-typing-bubble {
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08);
  border-radius:16px 16px 16px 4px; padding:12px 16px; display:flex; gap:5px;
}
.ll-dot { width:6px; height:6px; border-radius:50%; background:#7a7a9a; animation:llTyping 1.2s infinite; }
.ll-dot:nth-child(2) { animation-delay:.2s; }
.ll-dot:nth-child(3) { animation-delay:.4s; }
@keyframes llTyping { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-5px);opacity:1} }
.ll-card { background:rgba(245,166,35,.06); border:1px solid rgba(245,166,35,.2); border-radius:12px; padding:12px 14px; margin-top:6px; }
.ll-card-title { font-family:'Syne',sans-serif; font-size:.85rem; font-weight:700; color:#f5a623; margin-bottom:6px; }
.ll-card-row { display:flex; justify-content:space-between; align-items:center; padding:4px 0; border-bottom:1px solid rgba(255,255,255,.05); font-size:.78rem; gap:8px; }
.ll-card-row:last-child { border-bottom:none; }
.ll-card-row span:first-child { color:#9a9ab8; }
.ll-card-row span:last-child { color:#e8e8f0; font-weight:500; text-align:right; }
.ll-price-card { background:rgba(0,201,177,.06); border:1px solid rgba(0,201,177,.2); border-radius:12px; padding:12px 14px; margin-top:6px; }
.ll-price-big { font-family:'Syne',sans-serif; font-size:1.4rem; font-weight:800; color:#00c9b1; }
.ll-check-list { margin-top:8px; display:flex; flex-direction:column; gap:4px; }
.ll-check-item { font-size:.76rem; color:#9a9ab8; display:flex; align-items:flex-start; gap:6px; }
.ll-check-item::before { content:'✓'; color:#00c9b1; font-weight:700; flex-shrink:0; }
.ll-cta-btn {
  display:inline-block; margin-top:10px; padding:.5rem 1rem; border-radius:8px;
  background:linear-gradient(90deg,#f5a623,#ff7a1a); color:#0a0a0f;
  font-size:.78rem; font-weight:700; text-decoration:none; border:none; cursor:pointer;
  font-family:'Instrument Sans',sans-serif;
}
.ll-chips { display:flex; flex-wrap:wrap; gap:6px; padding:10px 14px 2px; flex-shrink:0; }
.ll-chip {
  padding:.38rem .85rem; border-radius:8px;
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.12);
  color:#b0b0cc; font-size:.75rem; font-weight:500; cursor:pointer;
  transition:all .18s; white-space:nowrap;
}
.ll-chip:hover { background:rgba(245,166,35,.12); border-color:rgba(245,166,35,.4); color:#f5a623; }
.ll-input-area {
  padding:12px 14px 16px; border-top:1px solid rgba(255,255,255,.07);
  display:flex; gap:8px; align-items:center; flex-shrink:0; background:rgba(0,0,0,.2);
}
.ll-input {
  flex:1; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
  border-radius:12px; padding:.62rem 14px; color:#e8e8f0;
  font-family:'Instrument Sans',sans-serif; font-size:.84rem;
  outline:none; resize:none; max-height:80px;
}
.ll-input::placeholder { color:#4a4a6a; }
.ll-input:focus { border-color:rgba(245,166,35,.45); }
.ll-send {
  width:38px; height:38px; border-radius:10px; border:none;
  background:linear-gradient(135deg,#f5a623,#ff7a1a);
  cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.ll-send:disabled { opacity:.4; cursor:not-allowed; }
.ll-send svg { width:16px; height:16px; fill:#0a0a0f; }
.ll-form { display:flex; flex-direction:column; gap:8px; margin-top:8px; }
.ll-form-input, .ll-form-select {
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
  border-radius:8px; padding:.55rem 10px; color:#e8e8f0;
  font-family:'Instrument Sans',sans-serif; font-size:.8rem; outline:none; width:100%;
}
.ll-form-select option { background:#1a1a25; }
.ll-form-input:focus, .ll-form-select:focus { border-color:rgba(245,166,35,.45); }
.ll-form-input::placeholder { color:#4a4a6a; }
.ll-form-submit {
  padding:.55rem 1rem; border-radius:8px; border:none;
  background:linear-gradient(90deg,#f5a623,#ff7a1a); color:#0a0a0f;
  font-size:.8rem; font-weight:700; cursor:pointer; font-family:'Instrument Sans',sans-serif;
}
.ll-form-submit:disabled { opacity:.5; cursor:not-allowed; }
.ll-handoff {
  margin-top:8px; padding:10px 12px; border-radius:10px;
  background:rgba(0,201,177,.08); border:1px solid rgba(0,201,177,.25);
  font-size:.78rem; color:#9a9ab8; line-height:1.45;
}
.ll-handoff strong { color:#00c9b1; }
.ll-footer-tag { text-align:center; padding:6px 0 10px; font-size:.65rem; color:#3a3a5a; }
.ll-footer-tag span { color:#4a4a7a; }
.ll-msg-time { font-size:.65rem; color:rgba(255,255,255,.25); margin-top:4px; }
@media(max-width:440px){
  .ll-panel { width:calc(100vw - 24px); right:-14px; height:min(580px, calc(100vh - 120px)); }
}
`;

const CONTACT_EMAIL = "launchlayer.techh@gmail.com";
const WHATSAPP_NUMBER = "919831014716";
const JARVIS_WEBHOOK = import.meta.env.VITE_JARVIS_WEBHOOK_URL || "";
const JARVIS_NAME = import.meta.env.VITE_JARVIS_AGENT_NAME || "Jarvis";

const KB = {
  services: [
    { name: "Agentic AI & Automation", desc: "Multi-step agents + workflows", icon: "🤖" },
    { name: "Cloud & AI Cost Reduction", desc: "FinOps for cloud + LLMs", icon: "💸" },
    { name: "MLOps", desc: "Notebook → production", icon: "⚙️" },
    { name: "AIRE", desc: "Evals, guardrails, SLAs", icon: "🛡️" },
    { name: "FDE Embeds", desc: "Engineers who ship with you", icon: "🧑‍💻" },
    { name: "Assistants & Integrations", desc: "WhatsApp, OCR, ERP/CRM", icon: "💬" },
  ],
  pricing: [
    { plan: "Starter", price: "$30/hr", desc: "One-off builds", features: ["Single workflow / agent", "1–2 integrations", "1 week support", "Free audit"] },
    { plan: "Growth", price: "$400/mo", desc: "Best value retainer", features: ["~10–20 hrs/month", "Up to 3 builds/month", "ROI review", "Priority WhatsApp", "₹33k/mo India"] },
    { plan: "Enterprise / FDE", price: "Custom", desc: "Embed + production AI", features: ["FDE pod", "MLOps + AIRE", "Cost programme", "SLA & NDA"] },
  ],
};

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function buildMsg(content, isBot = true, chips = [], type = "text") {
  return { id: Date.now() + Math.random(), content, isBot, chips, type, time: getTime() };
}

const RULES = [
  {
    match: /\b(hi|hello|hey|hiya|start|begin)\b/i,
    respond: () => ({
      text: `Hey! I'm **Laya**, LaunchLayer's front-desk assistant.\n\nI can answer questions — and when you're ready, I'll **capture your details and hand you to ${JARVIS_NAME}**, our delivery agent.\n\nWhat do you need?`,
      chips: ["🔧 Capabilities", "💰 Pricing", "📞 Talk to Jarvis", "💸 Cut cloud/AI costs"],
    }),
  },
  {
    match: /\b(service|capabilit|what.*(you|we) do|offer|agentic|mlops|aire|fde|automation)\b/i,
    respond: () => ({
      text: `We ship the **AI layer** — not demos:`,
      card: "services",
      chips: ["💰 Pricing", "📞 Talk to Jarvis", "💸 Cost reduction", "⚙️ How it works"],
    }),
  },
  {
    match: /\b(price|pricing|cost|how much|rate|₹|inr|usd)\b/i,
    respond: () => ({
      text: `Simple plans — no lock-in:`,
      card: "pricing",
      chips: ["📞 Talk to Jarvis", "🔧 Capabilities", "💸 Cost snapshot"],
    }),
  },
  {
    match: /\b(cost|finops|bill|aws|gcp|azure|llm|openai|waste|saving)\b/i,
    respond: () => ({
      text: `**Cloud & AI Cost Reduction** finds waste in infra and LLM usage — right-sizing, caching, cheaper-model routing, and alerts.\n\nTypical first cuts land in **2 weeks**. Want a free **Cloud & AI Cost Snapshot**? I'll hand you to **${JARVIS_NAME}**.`,
      chips: ["📞 Talk to Jarvis", "💰 Pricing", "🔧 Capabilities"],
    }),
  },
  {
    match: /\b(mlops|pilot|poc|production|prod|aire|reliable|eval)\b/i,
    respond: () => ({
      text: `Stuck pilot? We use **MLOps + AIRE** (AI Reliability Engineering) so demos become monitored production services — evals, guardrails, rollback.\n\n**FDEs** embed and ship in your stack. Ready for ${JARVIS_NAME}?`,
      chips: ["📞 Talk to Jarvis", "🔧 Capabilities", "💰 Pricing"],
    }),
  },
  {
    match: /\b(how.*(work|process)|process|timeline|fde|embed)\b/i,
    respond: () => ({
      text: `**01 — Free audit** (30 mins)\nMap workflows, spend, and pilot risk.\n\n**02 — FDE embeds & ships** (1–3 weeks)\nWorking agents/pipelines in your environment.\n\n**03 — MLOps + AIRE**\nKeep it reliable and the bill sane.\n\nI can hand your case to **${JARVIS_NAME}** now.`,
      chips: ["📞 Talk to Jarvis", "💰 Pricing"],
    }),
  },
  {
    match: /\b(book|audit|jarvis|handoff|hand over|talk|consult|schedule|demo|call|contact|snapshot)\b/i,
    respond: () => ({
      text: `Perfect — I'll take your details and **hand you to ${JARVIS_NAME}**.\n\n${JARVIS_NAME} gets your context so the next step is a real consult, not a cold pitch.`,
      form: true,
      chips: ["💬 WhatsApp instead", "✉️ Email instead"],
    }),
  },
  {
    match: /\b(thank|thanks|great|awesome|helpful)\b/i,
    respond: () => ({
      text: `Glad that helped. When you're ready, say **Talk to Jarvis** and I'll capture your details for handoff.`,
      chips: ["📞 Talk to Jarvis", "🔧 Capabilities", "💰 Pricing"],
    }),
  },
];

const FALLBACK = () => ({
  text: `I can help with capabilities, pricing, cost reduction, or connecting you to **${JARVIS_NAME}**.`,
  chips: ["🔧 Capabilities", "💰 Pricing", "📞 Talk to Jarvis", "💸 Cut cloud/AI costs"],
});

function getResponse(input) {
  const trimmed = input.trim().toLowerCase();
  for (const rule of RULES) {
    if (rule.match.test(trimmed)) return rule.respond();
  }
  return FALLBACK();
}

const WELCOME = {
  text: `Hi — I'm **Laya** 👋\n\nI qualify leads for LaunchLayer, then **hand you to ${JARVIS_NAME}** (our agent) with your details filled in.\n\nWhat brings you in?`,
  chips: ["🔧 Capabilities", "💰 Pricing", "📞 Talk to Jarvis", "💸 Cut cloud/AI costs"],
};

async function handoffToJarvis({ lead, conversation }) {
  const payload = {
    agent: JARVIS_NAME,
    source: "launchlayer.in chatbot",
    event: "lead_handoff",
    timestamp: new Date().toISOString(),
    lead,
    conversation: conversation.slice(-20).map((m) => ({
      role: m.isBot ? "assistant" : "user",
      content: m.content,
      time: m.time,
    })),
    pageUrl: typeof window !== "undefined" ? window.location.href : "https://launchlayer.in/",
  };

  const message = [
    `[JARVIS HANDOFF] New website lead`,
    ``,
    `Name: ${lead.name}`,
    lead.company ? `Company: ${lead.company}` : null,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.need ? `Need: ${lead.need}` : null,
    lead.notes ? `Notes: ${lead.notes}` : null,
    ``,
    `Source: launchlayer.in chatbot → ${JARVIS_NAME}`,
  ]
    .filter(Boolean)
    .join("\n");

  let webhookOk = false;
  if (JARVIS_WEBHOOK) {
    try {
      const res = await fetch(JARVIS_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      webhookOk = res.ok;
    } catch {
      webhookOk = false;
    }
  }

  // Always open WhatsApp as operator/Jarvis inbox fallback when webhook missing or failed
  if (!JARVIS_WEBHOOK || !webhookOk) {
    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(wa, "_blank", "noopener,noreferrer");
  }

  return { webhookOk, usedWhatsApp: !JARVIS_WEBHOOK || !webhookOk, payload };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chips, setChips] = useState(WELCOME.chips);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [formActive, setFormActive] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    need: "",
    notes: "",
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef([]);

  useEffect(() => {
    const el = document.createElement("style");
    el.id = "ll-chatbot-css";
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.getElementById("ll-chatbot-css")?.remove();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const msg = buildMsg(WELCOME.text, true, WELCOME.chips);
      setMessages([msg]);
      messagesRef.current = [msg];
    }, 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, formActive]);

  const pushBot = useCallback((text, nextChips = [], type = "text") => {
    const botMsg = buildMsg(text, true, nextChips, type);
    setMessages((prev) => {
      const next = [...prev, botMsg];
      messagesRef.current = next;
      return next;
    });
    setChips(nextChips);
  }, []);

  const sendMessage = useCallback((text) => {
    if (!text.trim() || formSending) return;
    const userMsg = buildMsg(text, false);
    setMessages((prev) => {
      const next = [...prev, userMsg];
      messagesRef.current = next;
      return next;
    });
    setInput("");
    setChips([]);
    setTyping(true);

    if (/whatsapp/i.test(text)) {
      setTimeout(() => {
        setTyping(false);
        pushBot(`WhatsApp us anytime:\n\n**+91 98310 14716**\n\nOr fill the form and I'll hand off to **${JARVIS_NAME}**.`, ["📞 Talk to Jarvis", "🔧 Capabilities"]);
      }, 700);
      return;
    }

    if (/email/i.test(text) && /instead|us|mail/i.test(text)) {
      setTimeout(() => {
        setTyping(false);
        pushBot(`Email: **${CONTACT_EMAIL}**\n\nOr capture details here for a **${JARVIS_NAME}** handoff.`, ["📞 Talk to Jarvis"]);
      }, 700);
      return;
    }

    const cleanText = text.replace(/^[^\w₹$]+/, "").trim();
    const response = getResponse(cleanText || text);
    const delay = 700 + Math.random() * 500;

    setTimeout(() => {
      setTyping(false);
      const botMsg = buildMsg(response.text, true, response.chips || [], response.card || "text");
      setMessages((prev) => {
        const next = [...prev, botMsg];
        messagesRef.current = next;
        return next;
      });
      setChips(response.chips || []);
      if (response.form && !formSent) setFormActive(true);
    }, delay);
  }, [formSending, formSent, pushBot]);

  const handleFormSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || formSending) return;
    setFormSending(true);
    try {
      const result = await handoffToJarvis({
        lead: { ...formData },
        conversation: messagesRef.current,
      });
      setFormSent(true);
      setFormActive(false);
      const via = result.webhookOk
        ? `webhook → **${JARVIS_NAME}**`
        : `WhatsApp handoff → **${JARVIS_NAME}**`;
      pushBot(
        `Thanks **${formData.name}** — you're handed to **${JARVIS_NAME}**. ✅\n\nDelivery via ${via}. Expect a reply within **24 hours**.\n\n<div class="ll-handoff"></div>`,
        ["🔧 Capabilities", "💰 Pricing"]
      );
      // Replace with cleaner message without fake HTML
      setMessages((prev) => {
        const cleaned = [...prev];
        cleaned[cleaned.length - 1] = buildMsg(
          `Thanks **${formData.name}** — handed to **${JARVIS_NAME}**. ✅\n\nChannel: ${result.webhookOk ? "Jarvis webhook" : "WhatsApp (Jarvis inbox)"}.\nWe'll follow up within **24 hours** with next steps.`,
          true,
          ["🔧 Capabilities", "💰 Pricing"],
          "handoff"
        );
        messagesRef.current = cleaned;
        return cleaned;
      });
      setChips(["🔧 Capabilities", "💰 Pricing"]);
    } catch {
      pushBot(`Something went wrong sending to ${JARVIS_NAME}. Email us at **${CONTACT_EMAIL}** or WhatsApp **+91 98310 14716**.`, ["💬 WhatsApp instead"]);
    } finally {
      setFormSending(false);
    }
  };

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
        <div className="ll-card">
          <div className="ll-card-title">Capabilities</div>
          {KB.services.map((s) => (
            <div className="ll-card-row" key={s.name}>
              <span>{s.icon} {s.name}</span>
              <span>{s.desc}</span>
            </div>
          ))}
        </div>
      );
    }
    if (type === "pricing") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {KB.pricing.map((p) => (
            <div className="ll-price-card" key={p.plan}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="ll-card-title" style={{ color: "#00c9b1", marginBottom: 2 }}>{p.plan}</div>
                  <div style={{ fontSize: ".72rem", color: "#7a7a9a" }}>{p.desc}</div>
                </div>
                <div className="ll-price-big">{p.price}</div>
              </div>
              <div className="ll-check-list">
                {p.features.slice(0, 3).map((f) => <div className="ll-check-item" key={f}>{f}</div>)}
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (type === "handoff") {
      return (
        <div className="ll-handoff">
          <strong>{JARVIS_NAME}</strong> now has this lead. Reply fast — warm handoffs convert.
        </div>
      );
    }
    return null;
  }

  return (
    <div className="ll-chat-widget">
      {open && (
        <div className="ll-panel" role="dialog" aria-label="LaunchLayer chat">
          <div className="ll-header">
            <div className="ll-avatar">⚡</div>
            <div className="ll-header-info">
              <div className="ll-header-name">Laya → {JARVIS_NAME}</div>
              <div className="ll-header-status">
                <span className="ll-status-dot" /> Online · Hands off to {JARVIS_NAME}
              </div>
            </div>
            <button className="ll-header-btn" title="Minimize" onClick={() => setOpen(false)} type="button">—</button>
          </div>

          <div className="ll-messages">
            {messages.map((msg) => (
              <div className={`ll-msg ${msg.isBot ? "" : "user"}`} key={msg.id}>
                <div className="ll-msg-avatar">{msg.isBot ? "⚡" : "👤"}</div>
                <div>
                  <div className="ll-bubble">
                    <div style={{ whiteSpace: "pre-line" }}>{renderText(msg.content)}</div>
                    {msg.type && msg.type !== "text" && renderCard(msg.type)}
                  </div>
                  <div className="ll-msg-time">{msg.time}</div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="ll-typing">
                <div className="ll-msg-avatar">⚡</div>
                <div className="ll-typing-bubble">
                  <span className="ll-dot" /><span className="ll-dot" /><span className="ll-dot" />
                </div>
              </div>
            )}

            {formActive && !formSent && (
              <div className="ll-msg">
                <div className="ll-msg-avatar">⚡</div>
                <div>
                  <div className="ll-bubble">
                    <div style={{ marginBottom: 8, fontSize: ".82rem" }}>
                      Details for <strong>{JARVIS_NAME}</strong> handoff:
                    </div>
                    <div className="ll-form">
                      <input className="ll-form-input" placeholder="Your name *" value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
                      <input className="ll-form-input" type="email" placeholder="Work email *" value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
                      <input className="ll-form-input" placeholder="Company" value={formData.company}
                        onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))} />
                      <input className="ll-form-input" placeholder="Phone / WhatsApp" value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                      <select className="ll-form-select" value={formData.need}
                        onChange={(e) => setFormData((p) => ({ ...p, need: e.target.value }))}>
                        <option value="">What do you need?</option>
                        <option value="Free AI Opportunity Audit">Free AI Opportunity Audit</option>
                        <option value="Free Cloud & AI Cost Snapshot">Free Cloud & AI Cost Snapshot</option>
                        <option value="Agentic AI / automation">Agentic AI / automation</option>
                        <option value="MLOps / productionise a pilot">MLOps / productionise a pilot</option>
                        <option value="AIRE — reliability & evals">AIRE — reliability & evals</option>
                        <option value="FDE embed">FDE embed</option>
                        <option value="Not sure — advise me">Not sure — advise me</option>
                      </select>
                      <input className="ll-form-input" placeholder="Anything Jarvis should know?" value={formData.notes}
                        onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))} />
                      <button className="ll-form-submit" type="button" disabled={formSending} onClick={handleFormSubmit}>
                        {formSending ? `Handing to ${JARVIS_NAME}…` : `Hand off to ${JARVIS_NAME} →`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {chips.length > 0 && !formActive && (
            <div className="ll-chips">
              {chips.map((c) => (
                <button className="ll-chip" key={c} type="button" onClick={() => sendMessage(c)}>{c}</button>
              ))}
            </div>
          )}

          <div className="ll-input-area">
            <textarea
              ref={inputRef}
              className="ll-input"
              placeholder="Ask about agents, costs, MLOps…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim()) sendMessage(input);
                }
              }}
              rows={1}
            />
            <button className="ll-send" type="button" onClick={() => input.trim() && sendMessage(input)} disabled={!input.trim()}>
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </div>

          <div className="ll-footer-tag">
            Handoffs routed to <span>{JARVIS_NAME}</span>
          </div>
        </div>
      )}

      <button
        className={`ll-launcher ${open ? "open" : ""}`}
        type="button"
        onClick={() => {
          if (open) setOpen(false);
          else {
            setOpen(true);
            setUnread(0);
            setTimeout(() => inputRef.current?.focus(), 300);
          }
        }}
        aria-label="Chat with LaunchLayer"
      >
        <svg className="icon-chat" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
        <svg className="icon-close" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
        {!open && unread > 0 && <span className="ll-badge">{unread}</span>}
      </button>
    </div>
  );
}
