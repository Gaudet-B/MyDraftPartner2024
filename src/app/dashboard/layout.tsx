import { PropsWithChildren } from "react";
import { BackgroundLogo } from "./content";
import { DashboardSidebar } from "./sidebar";

function FlexContainer({ children }: PropsWithChildren) {
  return <div className="flex flex-col items-center">{children}</div>;
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
    <div className="mt-[-50px] w-full pl-[75px]">
      <div className="flex flex-row gap-5 p-5">{children}</div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <>
      <DashboardSidebar />
      <FlexContainer>
        <TitleLogo />
        <DashboardContainer>{children}</DashboardContainer>
        <BackgroundLogo />
      </FlexContainer>
    </>
  );
}
