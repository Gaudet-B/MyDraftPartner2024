import { PropsWithChildren } from "react";
import { BackgroundLogo } from "./content";
import { DashboardSidebar } from "./sidebar";

function FlexContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex grow flex-col items-center pl-[75px] pt-3">
      {children}
    </div>
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
    <div className="w-full grow">{children}</div>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardSidebar />
      <FlexContainer>
        <TitleLogo />
        <DashboardContainer>{children}</DashboardContainer>
        {/* <BackgroundLogo /> */}
      </FlexContainer>
    </div>
  );
}
