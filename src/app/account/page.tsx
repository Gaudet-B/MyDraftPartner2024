import { HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  const hasDarkMode = session?.user.darkMode;

  return (
    <HydrateClient>
      {/** @TODO placeholder... */}
      Account
    </HydrateClient>
  );
}
