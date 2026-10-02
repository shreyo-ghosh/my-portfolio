import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const WEBHOOK = import.meta.env.VITE_JARVIS_WEBHOOK_URL || "";
const TOKEN_KEY = "ll_desk_token";

export default function Desk() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [draftToken, setDraftToken] = useState("");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Desk is live, sir. I can scan the inbox you authorised, keep reminders, take website leads from Laya, and draft LaunchLayer LinkedIn. Real phone calls are not free — I will speak on Telegram when something is due.",
    },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  const unlock = (e) => {
    e.preventDefault();
    if (!draftToken.trim()) return;
    localStorage.setItem(TOKEN_KEY, draftToken.trim());
    setToken(draftToken.trim());
  };

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || busy) return;
    setInput("");
    setError("");
    setMessages((m) => [...m, { role: "user", text: msg }]);
    setBusy(true);
    try {
      if (!WEBHOOK) throw new Error("VITE_JARVIS_WEBHOOK_URL is not set.");
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-desk-token": token,
        },
        body: JSON.stringify({ event: "desk_chat", token, text: msg }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setMessages((m) => [...m, { role: "assistant", text: data.text || "Noted." }]);
    } catch (err) {
      setError(err.message || "Desk call failed.");
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `I could not reach the Lambda desk: ${err.message}` },
      ]);
    } finally {
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <div className="desk-root">
        <style>{DESK_CSS}</style>
        <form className="desk-lock" onSubmit={unlock}>
          <h1>Jarvis desk</h1>
          <p>Private console. Same token as DESK_TOKEN in Lambda / SSM.</p>
          <input
            type="password"
            value={draftToken}
            onChange={(e) => setDraftToken(e.target.value)}
            placeholder="Desk token"
            autoFocus
          />
          <button type="submit">Unlock</button>
          <Link to="/">Back to site</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="desk-root">
      <style>{DESK_CSS}</style>
      <header className="desk-bar">
        <strong>Jarvis desk</strong>
        <nav>
          <button type="button" onClick={() => send("show activities")}>Activities</button>
          <button type="button" onClick={() => send("show leads")}>Leads</button>
          <button type="button" onClick={() => send("scan inbox")}>Scan inbox</button>
          <button type="button" onClick={() => send("linkedin week plan")}>LinkedIn week</button>
          <Link to="/">Site</Link>
        </nav>
      </header>
      <main className="desk-log">
        {messages.map((m, i) => (
          <article key={i} className={m.role}>
            <span>{m.role === "user" ? "You" : "Jarvis"}</span>
            <p>{m.text}</p>
          </article>
        ))}
        {busy && <p className="desk-busy">Thinking…</p>}
        <div ref={endRef} />
      </main>
      {error && <p className="desk-err">{error}</p>}
      <form
        className="desk-input"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to Jarvis — remind me, scan inbox, lead #1, LinkedIn post about…"
        />
        <button type="submit" disabled={busy}>Send</button>
      </form>
    </div>
  );
}

const DESK_CSS = `
.desk-root{min-height:100vh;background:#0a0a0f;color:#e8e8f0;font-family:Instrument Sans,system-ui,sans-serif;display:flex;flex-direction:column}
.desk-lock{max-width:420px;margin:18vh auto;padding:2rem;border:1px solid rgba(255,255,255,.08);border-radius:16px;display:flex;flex-direction:column;gap:12px}
.desk-lock h1{font-family:Syne,sans-serif;font-size:1.6rem}
.desk-lock input,.desk-input input{background:#181820;border:1px solid rgba(255,255,255,.12);border-radius:8px;color:#fff;padding:.7rem .9rem}
.desk-lock button,.desk-input button,.desk-bar button{background:#f5a623;color:#0a0a0f;border:none;border-radius:8px;padding:.65rem 1rem;font-weight:700;cursor:pointer}
.desk-bar{display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid rgba(255,255,255,.08);gap:12px;flex-wrap:wrap}
.desk-bar nav{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.desk-bar a,.desk-lock a{color:#00c9b1;font-size:.85rem}
.desk-log{flex:1;overflow:auto;padding:20px;display:flex;flex-direction:column;gap:14px}
.desk-log article{max-width:720px}
.desk-log article.user{margin-left:auto;text-align:right}
.desk-log span{font-size:.7rem;color:#7a7a9a;text-transform:uppercase;letter-spacing:.06em}
.desk-log p{white-space:pre-wrap;margin:.35rem 0 0;line-height:1.55}
.desk-input{display:flex;gap:8px;padding:14px 20px;border-top:1px solid rgba(255,255,255,.08)}
.desk-input input{flex:1}
.desk-err,.desk-busy{padding:0 20px;color:#f5a623;font-size:.85rem}
`;
