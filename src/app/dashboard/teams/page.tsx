import { HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import ContentArea from "@designsystem/container/ContentArea";
import TeamsContent from "./content";

export default async function Teams() {
  const session = await getServerAuthSession();
  const hasDarkMode = session?.user.darkMode;

  return (
    <HydrateClient>
      <ContentArea hasDarkMode={!!hasDarkMode}>
        <TeamsContent hasDarkMode={!!hasDarkMode} />
      </ContentArea>
    </HydrateClient>
  );
}
