import { HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ContentArea from "@designsystem/container/ContentArea";
import RecommendationsContent from "./content";

export default async function Recommendations() {
  const session = await getServerAuthSession();
  const hasDarkMode = session?.user.darkMode;

  const teams = await api.team.getAllTeamsByUser();

  return (
    <HydrateClient>
      <ContentArea hasDarkMode={!!hasDarkMode}>
        <RecommendationsContent hasDarkMode={!!hasDarkMode} teams={teams} />
      </ContentArea>
    </HydrateClient>
  );
}
