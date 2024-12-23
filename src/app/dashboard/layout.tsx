import { PropsWithChildren } from "react";
import { BackgroundLogoContainer } from "./content";
import { DashboardSidebar } from "./sidebar";
import Navigation from "@components/navigation/navigation";

function DashboardContainer({ children }: PropsWithChildren) {
  return <div className="flex min-h-screen w-full flex-col">{children}</div>;
}

function ContentContainer({ children }: PropsWithChildren) {
  return (
    <div className="absolute flex h-screen w-full flex-col items-center overflow-hidden pl-[75px] pt-[60px]">
      {children}
    </div>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <DashboardContainer>
      <Navigation />
      <DashboardSidebar />
      <ContentContainer>{children}</ContentContainer>
      <BackgroundLogoContainer />
    </DashboardContainer>
  );
}
