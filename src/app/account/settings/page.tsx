import { HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import AccountSettings from "./content";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  const hasDarkMode = session?.user.darkMode;

  return (
    <HydrateClient>
      <AccountSettings />
    </HydrateClient>
  );
}
