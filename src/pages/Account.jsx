import { useEffect, useState } from "react";
import { BlockText } from "../ui";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { ksh, mailLink } from "../data";
import { supabase, useSession } from "../supabase";

const day = (d) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—");
const daysUntil = (d) => (d ? Math.ceil((new Date(d) - new Date()) / 86400000) : null);

function Due({ date }) {
  const n = daysUntil(date);
  if (n === null) return <span>—</span>;
  const tone = n < 0 ? "is-late" : n <= 30 ? "is-soon" : "";
  return (
    <span className={`due ${tone}`}>
      {day(date)}
      <small>{n < 0 ? `${-n} days late` : n === 0 ? "today" : `in ${n} days`}</small>
    </span>
  );
}

/* The signed-in client's sites, dates and invoices. Read-only for them; the
   rows are added from the Supabase dashboard. */
export default function Account() {
  const session = useSession();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [data, setData] = useState({ loading: true, profile: null, services: [], invoices: [] });
  const [pw, setPw] = useState({ value: "", msg: "" });

  useEffect(() => {
    if (!session) return;
    (async () => {
      const [p, s, i] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle(),
        supabase.from("services").select("*").order("created_at"),
        supabase.from("invoices").select("*").order("due_on", { ascending: true }),
      ]);
      setData({ loading: false, profile: p.data, services: s.data || [], invoices: i.data || [] });
    })();
  }, [session]);

  if (session === undefined) return <div className="page-wait" aria-busy="true" />;
  if (!session) return <Navigate to="/login" replace />;

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const setPassword = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: pw.value });
    setPw({ value: "", msg: error ? error.message : "Password updated." });
  };

  const name = data.profile?.full_name || session.user.email;
  const open = data.invoices.filter((i) => !i.paid_at);

  return (
    <>
      <section className="wrap page-top has-art" aria-labelledby="acct-title">
        <span className="idx rise">{session.user.email}</span>
        <h1 id="acct-title" className="page-title rise">
          <BlockText text="Account" />
        </h1>
        <img className="page-art page-photo rise" src="/work/pages/account.jpg" alt="A desk with a laptop in red light" width="900" height="900" decoding="async" />
        <p className="page-sub rise">Hi {name.split(" ")[0]}. Here's what's coming up.</p>
      </section>

      <section className="wrap acct">
        {params.get("reset") && (
          <form className="form acct-reset" onSubmit={setPassword}>
            <label className="form-wide">
              <span>Choose a new password</span>
              <input type="password" minLength={8} required value={pw.value} onChange={(e) => setPw({ value: e.target.value, msg: "" })} autoComplete="new-password" />
            </label>
            <div className="form-end">
              <button type="submit" className="act act-solid">
                Save password
              </button>
              {pw.msg && <p className="login-soon">{pw.msg}</p>}
            </div>
          </form>
        )}

        <h2 className="pick-title">
          Your sites<span className="dot">.</span>
        </h2>
        {data.loading ? (
          <p className="cart-note">Loading…</p>
        ) : data.services.length === 0 ? (
          <p className="login-soon">Nothing here yet.</p>
        ) : (
          <ul className="acct-list">
            {data.services.map((s) => (
              <li key={s.id} className="acct-card">
                <b>{s.name}</b>
                {s.domain && (
                  <a href={`https://${s.domain}`} target="_blank" rel="noopener noreferrer" className="ulink">
                    {s.domain} ↗
                  </a>
                )}
                <dl>
                  <div>
                    <dt>Domain renews</dt>
                    <dd>
                      <Due date={s.domain_renews_on} />
                    </dd>
                  </div>
                  <div>
                    <dt>Maintenance due</dt>
                    <dd>
                      <Due date={s.maintenance_due_on} />
                    </dd>
                  </div>
                  {s.monthly_fee != null && (
                    <div>
                      <dt>Upkeep</dt>
                      <dd>{ksh(s.monthly_fee)} a month</dd>
                    </div>
                  )}
                </dl>
              </li>
            ))}
          </ul>
        )}

        <h2 className="pick-title">
          Invoices<span className="dot">.</span>
        </h2>
        {data.loading ? null : data.invoices.length === 0 ? (
          <p className="login-soon">No invoices yet.</p>
        ) : (
          <ul className="acct-list">
            {data.invoices.map((i) => (
              <li key={i.id} className="acct-card">
                <b>{i.description}</b>
                <span className="acct-amount">{ksh(i.amount)}</span>
                <dl>
                  <div>
                    <dt>{i.paid_at ? "Paid" : "Due"}</dt>
                    <dd>{i.paid_at ? day(i.paid_at) : <Due date={i.due_on} />}</dd>
                  </div>
                </dl>
                {!i.paid_at && (
                  <Link to={`/pay?amount=${i.amount}&ref=${encodeURIComponent(i.description)}`} className="act act-solid">
                    Pay now <span aria-hidden="true">→</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="acct-end">
          <p className="cart-note">
            {open.length ? `${open.length} invoice${open.length > 1 ? "s" : ""} open. ` : ""}Questions about your site?{" "}
            <a href={mailLink("Hi Tessy, I have a question about my site.")} target="_blank" rel="noopener noreferrer" className="ulink">
              Email us ↗
            </a>
          </p>
          <button type="button" className="act" onClick={signOut}>
            Log out
          </button>
        </div>
      </section>
    </>
  );
}
