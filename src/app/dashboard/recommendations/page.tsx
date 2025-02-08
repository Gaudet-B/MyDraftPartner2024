import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { MockResultsContent } from "./content";

export default async function Recommendations() {
  const session = await getServerAuthSession();
  const hasDarkMode = session?.user.darkMode;
  const teams = session ? await api.team.getAllTeamsByUser() : [];

  // let theme = "light" as "light" | "dark";

  return <MockResultsContent />;
}
