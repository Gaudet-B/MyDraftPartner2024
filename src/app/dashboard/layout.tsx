import { PropsWithChildren } from "react";
// import { BackgroundLogo } from "./content";
import { DashboardSidebar } from "./sidebar";
import Navigation from "@components/navigation/navigation";

function FlexContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex grow flex-col items-center pl-[75px]">{children}</div>
  );
}

function TitleLogo() {
  /** @TODO grab custom CSS from 'logo-title' class */
  return (
    <h1 className={`logo-title dashboard text-3xl`}>MyDraft Partner 2.0</h1>
  );
}

function DashboardContainer({ children }: PropsWithChildren) {
  return (
    /** @TODO check these bracked custom classes... */
    <div className="flex w-full grow flex-col">{children}</div>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navigation />
      <DashboardSidebar />
      <FlexContainer>
        {/* <TitleLogo /> */}
        <DashboardContainer>{children}</DashboardContainer>
        {/* <BackgroundLogo /> */}
      </FlexContainer>
    </div>
  );
}
