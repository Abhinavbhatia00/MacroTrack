import { useState } from "react";
import { AlertCircle, LoaderCircle, X } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function LoginModal({ onClose }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    if (!supabase) return setMessage("Add the Supabase values to your .env file.");
    setBusy(true); setMessage("");
    const result = mode === "signup" ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } }) : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (result.error) return setMessage(result.error.message);
    if (mode === "signup" && !result.data.session) return setMessage("Check your email to confirm your account.");
    onClose();
  }

  async function googleLogin() {
    if (!supabase) return setMessage("Add the Supabase values to your .env file.");
    setBusy(true); setMessage("");
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
    if (error) { setBusy(false); setMessage(error.message); }
  }

  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
    <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#171a21] p-6 shadow-2xl sm:p-8">
      <div className="flex justify-between"><div><p className="eyebrow text-[#43d6a1]">Secure account</p><h2 className="mt-2 text-3xl font-semibold">Welcome to MacroTrack.</h2></div><button onClick={onClose} aria-label="Close login" className="icon-button"><X size={19} /></button></div>
      <button onClick={googleLogin} disabled={busy} className="mt-7 h-12 w-full rounded-xl bg-white font-bold text-black">Continue with Google</button>
      <div className="my-5 flex items-center gap-3 text-xs text-white/30"><span className="h-px flex-1 bg-white/10" />OR USE EMAIL<span className="h-px flex-1 bg-white/10" /></div>
      <div className="mb-5 grid grid-cols-2 rounded-xl bg-white/[.04] p-1">{["login", "signup"].map((item) => <button key={item} onClick={() => setMode(item)} className={`rounded-lg py-2 text-sm ${mode === item ? "bg-white/10 text-white" : "text-white/40"}`}>{item === "login" ? "Log in" : "Create account"}</button>)}</div>
      <form onSubmit={submit} className="space-y-4"><label className="field-label">Email<input className="field" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label><label className="field-label">Password<input className="field" type="password" minLength="6" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>{message && <p className="flex gap-2 rounded-xl bg-white/[.04] p-3 text-sm text-white/60"><AlertCircle size={17} />{message}</p>}<button disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#43d6a1] font-bold text-[#0d1714]">{busy && <LoaderCircle size={18} className="animate-spin" />}{mode === "login" ? "Log in" : "Create account"}</button></form>
    </div>
  </div>;
}
