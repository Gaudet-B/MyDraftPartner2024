import { HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import ContentArea from "@designsystem/container/ContentArea";
import DashBoardContent from "./content";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  const hasDarkMode = session?.user.darkMode;

  return (
    <HydrateClient>
      <ContentArea hasDarkMode={!!hasDarkMode}>
        <DashBoardContent hasDarkMode={!!hasDarkMode} />
      </ContentArea>
    </HydrateClient>
  );
}
