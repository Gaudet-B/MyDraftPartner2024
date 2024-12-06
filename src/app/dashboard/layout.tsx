import { PropsWithChildren } from "react";
import { BackgroundLogoContainer } from "./content";
import { DashboardSidebar } from "./sidebar";
import Navigation from "@components/navigation/navigation";

function TitleLogo() {
  /** @TODO grab custom CSS from 'logo-title' class */
  return (
    <h1 className={`logo-title dashboard text-3xl`}>MyDraft Partner 2.0</h1>
  );
}

function DashboardContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full grow flex-col items-center pl-[75px]">
      {children}
    </div>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navigation />
      <DashboardSidebar />
      {/* <FlexContainer> */}
      {/* <TitleLogo /> */}
      <DashboardContainer>{children}</DashboardContainer>
      {/* </FlexContainer> */}
      <BackgroundLogoContainer />
    </div>
  );
}
