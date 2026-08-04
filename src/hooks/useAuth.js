import { useEffect, useState } from "react";
import { profileFromUser, supabase } from "../lib/supabase";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(profileFromUser(data.session?.user));
      setAuthReady(true);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(profileFromUser(session?.user));
      setAuthReady(true);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const logout = () => supabase?.auth.signOut();

  return { user, authReady, logout };
}
