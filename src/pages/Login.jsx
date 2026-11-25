import { useEffect, useState } from "react";
import { BlockText } from "../ui";
import { Navigate, useSearchParams } from "react-router-dom";
import { mailLink } from "../data";
import { supabase, useSession } from "../supabase";

/* Log in or sign up for the client area. Email + password, or a sign-in link
   by email. Signed-in clients go straight to their account. */
export default function Login() {
  const [params] = useSearchParams();
  const session = useSession();
  const [mode, setMode] = useState(params.get("mode") === "signup" ? "signup" : "login");
  const [f, setF] = useState({ email: "", password: "", full_name: "", phone: "", business: "" });
  const [state, setState] = useState({ status: "idle", msg: "" });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  useEffect(() => setState({ status: "idle", msg: "" }), [mode]);

  if (session) return <Navigate to="/account" replace />;

  const run = async (fn, okMsg) => {
    setState({ status: "busy", msg: "" });
    const { error } = await fn();
    setState(error ? { status: "error", msg: error.message } : { status: "ok", msg: okMsg });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!supabase) return;
    if (mode === "signup") {
      run(
        () =>
          supabase.auth.signUp({
            email: f.email,
            password: f.password,
            options: { data: { full_name: f.full_name, phone: f.phone, business: f.business }, emailRedirectTo: `${window.location.origin}/account` },
          }),
        "Check your email to confirm your account, then log in."
      );
    } else {
      run(() => supabase.auth.signInWithPassword({ email: f.email, password: f.password }), "");
    }
  };

  const sendLink = () => {
    if (!f.email) return setState({ status: "error", msg: "Type your email first." });
    run(() => supabase.auth.signInWithOtp({ email: f.email, options: { emailRedirectTo: `${window.location.origin}/account`, shouldCreateUser: false } }), "Check your email for the sign-in link.");
  };

  const forgot = () => {
    if (!f.email) return setState({ status: "error", msg: "Type your email first." });
    run(() => supabase.auth.resetPasswordForEmail(f.email, { redirectTo: `${window.location.origin}/account?reset=1` }), "Check your email for a link to set a new password.");
  };

  return (
    <>
      <section className="wrap page-top" aria-labelledby="login-title">
        <span className="idx rise">Client area</span>
        <h1 id="login-title" className="page-title rise">
          <BlockText text={mode === "signup" ? "Sign up" : "Log in"} />
        </h1>
        <p className="page-sub rise">Your sites, dates and invoices.</p>
      </section>

      <section className="wrap pay">
        <form className="form login-form" onSubmit={submit}>
          <div className="form-wide form-needs" role="tablist" aria-label="Log in or sign up">
            <button type="button" role="tab" className="pill-link" aria-pressed={mode === "login"} aria-selected={mode === "login"} onClick={() => setMode("login")}>
              Log in
            </button>
            <button type="button" role="tab" className="pill-link" aria-pressed={mode === "signup"} aria-selected={mode === "signup"} onClick={() => setMode("signup")}>
              Sign up
            </button>
          </div>

          {!supabase && (
            <p className="login-soon form-wide" role="status">
              Accounts are being switched on. Until then, email us at hello@tessy.co.ke.
            </p>
          )}

          {mode === "signup" && (
            <>
              <label>
                <span>Your name</span>
                <input value={f.full_name} onChange={set("full_name")} required maxLength={80} autoComplete="name" />
              </label>
              <label>
                <span>Phone</span>
                <input value={f.phone} onChange={set("phone")} required maxLength={20} inputMode="tel" autoComplete="tel" placeholder="07… or +254…" />
              </label>
              <label className="form-wide">
                <span>Business name</span>
                <input value={f.business} onChange={set("business")} maxLength={80} autoComplete="organization" />
              </label>
            </>
          )}

          <label>
            <span>Email</span>
            <input type="email" value={f.email} onChange={set("email")} required autoComplete="email" disabled={!supabase} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={f.password} onChange={set("password")} required minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} disabled={!supabase} />
          </label>

          <div className="form-end">
            <button type="submit" className="act act-solid" disabled={!supabase || state.status === "busy"}>
              {state.status === "busy" ? "One moment…" : mode === "signup" ? "Create my account" : "Log in"} <span aria-hidden="true">→</span>
            </button>
            {mode === "login" && supabase && (
              <>
                <button type="button" className="act act-quiet" onClick={sendLink} disabled={state.status === "busy"}>
                  Email me a link instead
                </button>
                <button type="button" className="ulink login-forgot" onClick={forgot}>
                  Forgot password?
                </button>
              </>
            )}
          </div>

          {state.msg && (
            <p className={`form-wide ${state.status === "error" ? "form-error" : "login-soon"}`} role={state.status === "error" ? "alert" : "status"}>
              {state.msg}
            </p>
          )}
        </form>

        <aside className="pay-side">
          <p className="pay-side-k">For clients</p>
          <p className="cart-note">Renewals, maintenance and payments in one place.</p>
          <a href={mailLink("Hi Tessy, I'm a client and need help with my account.")} target="_blank" rel="noopener noreferrer" className="act act-solid">
            Email us <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </section>
    </>
  );
}
