import { api, HydrateClient } from "~/trpc/server";
// import { getServerAuthSession } from "~/server/auth";
import TeamsContent, { TeamType } from "./content";

export default async function Teams() {
  // const session = await getServerAuthSession();
  // const userId = session?.user.id;
  const teams = await api.team.getAllTeamsByUser();
  return (
    <HydrateClient>
      <TeamsContent teams={teams as Array<TeamType>} />
    </HydrateClient>
  );
}
