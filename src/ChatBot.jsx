import { useState, useEffect, useRef, useCallback } from "react";

/* ─── STYLES ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Instrument+Sans:wght@400;500;600&display=swap');

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
  background:rgba(8,14,20,.92); border:1px solid rgba(140,210,220,.18);
  backdrop-filter:blur(16px);
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
.ll-header-name { font-family:'Instrument Serif',Georgia,serif; font-size:1.05rem; font-weight:400; color:#fff; }
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
.ll-card-title { font-family:'Instrument Serif',Georgia,serif; font-size:.95rem; font-weight:400; color:#f5a623; margin-bottom:6px; }
.ll-card-row { display:flex; justify-content:space-between; align-items:center; padding:4px 0; border-bottom:1px solid rgba(255,255,255,.05); font-size:.78rem; gap:8px; }
.ll-card-row:last-child { border-bottom:none; }
.ll-card-row span:first-child { color:#9a9ab8; }
.ll-card-row span:last-child { color:#e8e8f0; font-weight:500; text-align:right; }
.ll-price-card { background:rgba(0,201,177,.06); border:1px solid rgba(0,201,177,.2); border-radius:12px; padding:12px 14px; margin-top:6px; }
.ll-price-big { font-family:'Instrument Serif',Georgia,serif; font-size:1.35rem; font-weight:400; color:#00c9b1; }
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

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const DISCOVER_CHIPS = ["Cloud bill is too high", "Pilot stuck in demo", "We need agents", "Show pricing"];

const WELCOME = {
  text: `Hi — I'm **Laya**.\n\nTell me what's stuck, and I'll get the useful part on the table before I ask for a way to follow up.`,
  chips: DISCOVER_CHIPS,
};

function inferNeed(text) {
  const t = text.toLowerCase();
  if (/\b(bill|aws|gcp|azure|llm|openai|finops|waste|saving|cost snapshot)\b/.test(t)) return "Free Cloud & AI Cost Snapshot";
  if (/\b(pilot|poc|mlops|prod|aire|eval|demo)\b/.test(t)) return "MLOps / productionise a pilot";
  if (/\b(fde|embed)\b/.test(t)) return "FDE embed";
  if (/\b(agent|automat|busy|workflow|whatsapp)\b/.test(t)) return "Agentic AI / automation";
  if (/\b(price|pricing|rate|plan)\b/.test(t)) return "Pricing — wants a consult";
  if (/\baudit\b/.test(t)) return "Free AI Opportunity Audit";
  return "";
}

function answerTopic(text) {
  const t = text.toLowerCase();
  if (/^(hi|hello|hey|hiya)\b/.test(t) && t.split(/\s+/).length < 5) {
    return {
      text: `Good to meet you. What's the expensive or stuck part — a cloud bill, a pilot, or work the team still does by hand?`,
      chips: DISCOVER_CHIPS,
      qualify: false,
    };
  }
  if (/\b(price|pricing|how much|rate|plan)\b/.test(t)) {
    return {
      text: `Three ways in, no lock-in. Most teams start with the free audit, then Growth if they want a reserved engineer.`,
      card: "pricing",
      qualify: true,
    };
  }
  if (/\b(capabilit|service|what.*(you|we) do|offer)\b/.test(t) && !inferNeed(t)) {
    return {
      text: `We ship the layer around the model: agents that do the work, production discipline, and a bill someone owns.`,
      card: "services",
      qualify: true,
    };
  }
  if (/\b(bill|aws|gcp|azure|llm|finops|waste|saving)\b/.test(t)) {
    return {
      text: `A cost snapshot looks at idle infra and unrouted model calls. First cuts are usually in about two weeks, and we confirm the number against your bill before anyone builds.`,
      qualify: true,
    };
  }
  if (/\b(pilot|poc|mlops|aire|eval|demo|production)\b/.test(t)) {
    return {
      text: `A pilot that dies on real users usually needs evals, a rollback, and someone in the repo — not another slide. That's the MLOps + AIRE embed.`,
      qualify: true,
    };
  }
  if (/\b(how.*(work|process)|timeline|process)\b/.test(t)) {
    return {
      text: `Thirty-minute audit, then an engineer in your stack for one to three weeks, then monitoring so it stays up and the bill stays honest.`,
      qualify: true,
    };
  }
  if (/\b(agent|automat|busy|workflow)\b/.test(t)) {
    return {
      text: `We put an agent on the repetitive job — mail, POs, leads, support — and leave a human on the exceptions. That's usually the first thing that pays for itself.`,
      qualify: true,
    };
  }
  if (/\b(thank|thanks|great|perfect)\b/.test(t)) {
    return {
      text: `Glad that was useful. If you want a human to pick this up, I only need a name and an email.`,
      qualify: true,
    };
  }
  return {
    text: `I can talk through a cloud bill, a stuck pilot, agents for busywork, or pricing. What should we start with?`,
    chips: DISCOVER_CHIPS,
    qualify: false,
  };
}

function handoffToJarvis({ lead, conversation }) {
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

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const mailUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`LaunchLayer lead — ${lead.name}`)}&body=${encodeURIComponent(message)}`;

  const sent = (async () => {
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
    return { webhookOk, waUrl, mailUrl, payload };
  })();

  return { waUrl, mailUrl, sent };
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
  const stageRef = useRef("discover");
  const leadRef = useRef({ name: "", email: "", company: "", phone: "", need: "", notes: "" });
  const [handoffLinks, setHandoffLinks] = useState(null);

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

  const replyWith = useCallback((response) => {
    const botMsg = buildMsg(response.text, true, response.chips || [], response.card || "text");
    setMessages((prev) => {
      const next = [...prev, botMsg];
      messagesRef.current = next;
      return next;
    });
    setChips(response.chips || []);
    if (response.links) setHandoffLinks(response.links);
  }, []);

  const completeLead = useCallback(async (lead, openWhatsApp) => {
    const draft = handoffToJarvis({
      lead,
      conversation: messagesRef.current,
    });
    let popup = null;
    if (openWhatsApp && !JARVIS_WEBHOOK) {
      popup = window.open(draft.waUrl, "_blank", "noopener,noreferrer");
    }
    const result = await draft.sent;
    stageRef.current = "done";
    setFormSent(true);
    setFormActive(false);
    if (!result.webhookOk && openWhatsApp && !popup) {
      setHandoffLinks({ waUrl: result.waUrl, mailUrl: result.mailUrl });
    }
    const channel = result.webhookOk
      ? `${JARVIS_NAME} has the lead. We'll reply within **24 hours**.`
      : `I opened WhatsApp with your details. Send that message and **${JARVIS_NAME}** will pick it up within **24 hours**.`;
    replyWith({
      text: `Got it, **${lead.name}**.\n\nNeed: **${lead.need || "Consult"}**${lead.company ? `\nCompany: **${lead.company}**` : ""}\nEmail: **${lead.email}**\n\n${channel}`,
      card: "handoff",
      chips: [],
      links: result.webhookOk ? null : { waUrl: result.waUrl, mailUrl: result.mailUrl },
    });
  }, [replyWith]);

  const sendMessage = useCallback((raw) => {
    const text = raw.trim();
    if (!text || formSending || stageRef.current === "done") return;
    const userMsg = buildMsg(text, false);
    setMessages((prev) => {
      const next = [...prev, userMsg];
      messagesRef.current = next;
      return next;
    });
    setInput("");
    setChips([]);
    setTyping(true);

    const lead = leadRef.current;
    const stage = stageRef.current;
    const foundEmail = text.match(EMAIL_RE)?.[0];
    if (foundEmail) lead.email = foundEmail;
    const guessed = inferNeed(text);
    if (guessed) lead.need = guessed;

    const wantsForm = /form/i.test(text);
    const wantsPerson = /\b(book|audit|jarvis|handoff|hand over|talk|consult|schedule|call|contact)\b/i.test(text);

    let finishing = null;
    if (stage === "context" && !wantsForm) {
      lead.notes = text;
      if (!lead.need) lead.need = inferNeed(text) || "Free AI Opportunity Audit";
      finishing = handoffToJarvis({ lead: { ...lead }, conversation: messagesRef.current });
      if (!JARVIS_WEBHOOK) finishing.popup = window.open(finishing.waUrl, "_blank", "noopener,noreferrer");
    }

    window.setTimeout(() => {
      setTyping(false);
      if (finishing) {
        finishing.sent.then((result) => {
          stageRef.current = "done";
          setFormSent(true);
          setFormActive(false);
          const channel = result.webhookOk
            ? `${JARVIS_NAME} has the lead. We'll reply within **24 hours**.`
            : `WhatsApp has your details ready. Send that message and **${JARVIS_NAME}** follows up within **24 hours**.`;
          replyWith({
            text: `Got it, **${lead.name}**.\n\nNeed: **${lead.need}**${lead.company ? `\nCompany: **${lead.company}**` : ""}\nEmail: **${lead.email}**\n\n${channel}`,
            card: "handoff",
            chips: [],
            links: result.webhookOk ? null : { waUrl: result.waUrl, mailUrl: result.mailUrl },
          });
        });
        return;
      }
      if (wantsForm && stage !== "done") {
        setFormActive(true);
        replyWith({ text: "Use the short form. I'll send it as soon as you submit.", chips: [] });
        return;
      }
      if (stage === "name") {
        const name = text.replace(/^(i'm|i am|my name is|it's|it is)\s+/i, "").trim();
        if (name.length < 2 || EMAIL_RE.test(name)) {
          replyWith({ text: "What name should I put on the intro?", chips: [] });
          return;
        }
        lead.name = name.split(/\s+/).slice(0, 4).join(" ");
        stageRef.current = lead.email ? "company" : "email";
        replyWith(lead.email
          ? { text: `Thanks **${lead.name}**. I have **${lead.email}**. Company name, or say **skip**.`, chips: ["Skip"] }
          : { text: `Thanks **${lead.name}**. What's the best work email for the follow-up?`, chips: [] });
        return;
      }
      if (stage === "email") {
        if (!lead.email) {
          replyWith({ text: "I need an email that looks like name@company.com.", chips: [] });
          return;
        }
        stageRef.current = "company";
        replyWith({ text: "Company? Say **skip** if you're looking on your own.", chips: ["Skip"] });
        return;
      }
      if (stage === "company") {
        if (!/^skip$/i.test(text)) lead.company = text;
        stageRef.current = "context";
        replyWith({
          text: "Last one. In a sentence, what's expensive, manual, or stuck?",
          chips: ["Cloud bill", "Stuck pilot", "Manual busywork"],
        });
        return;
      }
      if (stage === "context") return;

      if (wantsForm) {
        setFormActive(true);
        replyWith({ text: "Use the short form and I'll send it the moment you submit.", chips: [] });
        return;
      }

      if (/whatsapp/i.test(text)) {
        replyWith({
          text: `Tap below to open WhatsApp. Or keep going here and I'll package a proper intro for **${JARVIS_NAME}**.`,
          chips: ["Start the intro"],
          links: { waUrl: `https://wa.me/${WHATSAPP_NUMBER}`, mailUrl: `mailto:${CONTACT_EMAIL}` },
        });
        return;
      }

      const topic = answerTopic(text);
      const ready = topic.qualify || wantsPerson || text === "Start the intro";
      if (ready && !formSent) {
        stageRef.current = lead.name ? (lead.email ? "company" : "email") : "name";
        const ask = stageRef.current === "name"
          ? `What name should I use for the intro to **${JARVIS_NAME}**?`
          : stageRef.current === "email"
            ? `I have your name. What's the work email?`
            : `Company, or say **skip**.`;
        replyWith({
          text: `${topic.text}\n\n${ask}`,
          card: topic.card,
          chips: stageRef.current === "company" ? ["Skip"] : ["Use a short form"],
        });
        return;
      }
      replyWith(topic);
    }, 650);
  }, [completeLead, formSending, formSent, replyWith]);

  const handleFormSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || formSending) return;
    if (!EMAIL_RE.test(formData.email)) return;
    setFormSending(true);
    leadRef.current = { ...leadRef.current, ...formData };
    try {
      await completeLead({ ...leadRef.current }, true);
    } catch {
      replyWith({
        text: `I couldn't send that. Use one of the buttons below to reach us directly.`,
        chips: [],
        links: { waUrl: `https://wa.me/${WHATSAPP_NUMBER}`, mailUrl: `mailto:${CONTACT_EMAIL}` },
      });
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

          {handoffLinks && (
            <div className="ll-chips">
              <a className="ll-cta-btn" href={handoffLinks.waUrl} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
              <a className="ll-cta-btn" href={handoffLinks.mailUrl}>Email instead</a>
            </div>
          )}

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
