import { PropsWithChildren } from "react";
import { api, HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import ContentArea from "@designsystem/container/ContentArea";
import {
  RecommendationsRow,
  RecommendationsText,
  ResultsContainer,
  // RecommendationsSubmit,
  SettingsAndSubmit,
  SideTab,
  // TeamSettingsList,
} from "./content";
import { RecommendationsInputs } from "./content";
import { RecommendationsContent } from "./content";
// import { RoundInTab } from "~/app/_components/design-system/tab/RoundedTab";
// import { RESULTS_TAB_COLORS } from "~/app/_components/design-system/tab/RoundedTab";
// import { RoundOutTab } from "~/app/_components/design-system/tab/RoundedTab";

export const COLUMN_WIDTHS = {
  show: ["w-72", "w-0"],
  hide: ["w-full", "w-96"],
};

function RecsFlexColumn({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full flex-col items-stretch">
      <div className="flex h-full w-full grow flex-col items-center gap-4">
        {children}
      </div>
    </div>
  );
}

function RecsSettingsRow({ children }: PropsWithChildren) {
  return (
    <div className={`flex`}>
      <RecommendationsRow>{children}</RecommendationsRow>
    </div>
  );
}

export default async function RecommendationsLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const session = await getServerAuthSession();
  const hasDarkMode = session?.user.darkMode;

  const teams = session ? await api.team.getAllTeamsByUser() : [];

  return (
    <HydrateClient>
      <ContentArea hasDarkMode={!!hasDarkMode} outer="Wide" inner="Scrollable">
        <RecsFlexColumn>
          {/* <RecsFlexContainer> */}
          <RecommendationsContent>
            {/* <RecsContentCol> */}
            <RecsSettingsRow>
              {/* <RecommendationsText /> */}
              <RecommendationsInputs widths={COLUMN_WIDTHS} />
              <SettingsAndSubmit
                teams={teams}
                session={session}
                widths={COLUMN_WIDTHS}
              />
              {/* <div className="flex flex-col gap-4">
                <TeamSettingsList teams={teams} session={session} />
                <RecommendationsSubmit />
              </div> */}
            </RecsSettingsRow>
            <SideTab />
            {/* <ResultsContainer> */}
            {children}
            {/* </ResultsContainer> */}
            {/* </RecsContentCol> */}
          </RecommendationsContent>
          {/* </RecsFlexContainer> */}
        </RecsFlexColumn>
      </ContentArea>
    </HydrateClient>
  );
}
