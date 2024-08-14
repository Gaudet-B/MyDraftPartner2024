import { api, HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import TeamsContent from "./content";

export default async function Teams() {
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  const teams = await api.team.getAllTeamsByPlayer();
  return (
    <HydrateClient>
      <TeamsContent teams={teams} />
    </HydrateClient>
  );
}
