import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

/* Client accounts, through Supabase. Set these in Vercel → Settings →
   Environment Variables (both are safe to be public — the database rules in
   supabase/schema.sql decide what each signed-in client can see):
     VITE_SUPABASE_URL       https://<project>.supabase.co
     VITE_SUPABASE_ANON_KEY  the project's anon / publishable key */
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;

/* The signed-in client, or null. undefined while it is still being checked. */
export function useSession() {
  const [session, setSession] = useState(supabase ? undefined : null);
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  return session;
}
