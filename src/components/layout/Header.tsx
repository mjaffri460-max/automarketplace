import { createClient } from "@/lib/supabase/server";
import { HeaderNav } from "./HeaderNav";

export async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const isSignedIn = Boolean(data.user);

  return <HeaderNav isSignedIn={isSignedIn} />;
}
