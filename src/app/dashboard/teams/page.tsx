import { api, HydrateClient } from "~/trpc/server";
// import { getServerAuthSession } from "~/server/auth";
import TeamsContent, { TeamType } from "./content";
import { TeamSettings as TeamSettingsType } from "./_components/TeamInfo/info";

// export type CreateTeam = typeof api.team.createTeam;
// export type UpdateTeam = typeof api.team.updateTeam;
// type TeamCreateInput = Parameters<typeof api.team.createTeam>[0];
// type TeamUpdateInput = Parameters<typeof api.team.updateTeam>[0];

export default async function Teams() {
  /** @TODO add auth */
  // const session = await getServerAuthSession();
  // const userId = session?.user.id;
  // const createTeam = api.team.createTeam;
  // const updateTeam = api.team.updateTeam;
  // const createTeam = (t: TeamCreateInput) => api.team.createTeam(t);
  // const updateTeam = (t: TeamUpdateInput) => api.team.updateTeam(t);
  // const createMutation = api.team.createTeam.useMutation();
  // const updateMutation = api.team.updateTeam.useMutation();
  const teams = await api.team.getAllTeamsByUser();
  /** @TODO utilize 'isLoading' and 'isError' */
  // const { data: teams, isLoading, isError } = api.team.getAllTeamsByUser.useQuery();
  return (
    <HydrateClient>
      <TeamsContent
        // api={{
        //   createTeam,
        //   updateTeam,
        // }}
        // createMutation={createMutation}
        // updateMutation={updateMutation}
        teams={teams as Array<TeamType>}
      />
    </HydrateClient>
  );
}
