import { HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ContentArea from "@designsystem/container/ContentArea";
import RecommendationsContent from "./content";

export default async function Recommendations() {
  const session = await getServerAuthSession();
  const hasDarkMode = session?.user.darkMode;

  const teams = session ? await api.team.getAllTeamsByUser() : [];

  return (
    <HydrateClient>
      <ContentArea hasDarkMode={!!hasDarkMode}>
        <RecommendationsContent
          hasDarkMode={!!hasDarkMode}
          teams={teams}
          session={session}
        />
      </ContentArea>
    </HydrateClient>
  );
}
