import { HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import ContentArea from "@designsystem/container/ContentArea";
import RecommendationsContent from "./content";

export default async function Recommendations() {
  const session = await getServerAuthSession();
  const hasDarkMode = session?.user.darkMode;

  return (
    <HydrateClient>
      <ContentArea hasDarkMode={!!hasDarkMode}>
        <RecommendationsContent hasDarkMode={!!hasDarkMode} />
      </ContentArea>
    </HydrateClient>
  );
}
