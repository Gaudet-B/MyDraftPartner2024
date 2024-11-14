import { api, HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import AccountSettings from "./content";
import { redirect } from "next/navigation";

export default async function Account() {
  const session = await getServerAuthSession();
  const hasDarkMode = session?.user.darkMode;

  if (!session?.user) return redirect("/dashboard");

  const user = await api.user.me();

  return (
    <HydrateClient>
      {/** @TODO placeholder... */}
      {/* <>Account</> */}
      {<AccountSettings user={user ?? undefined} />}
    </HydrateClient>
  );
}
