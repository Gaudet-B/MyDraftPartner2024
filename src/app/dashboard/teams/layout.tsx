import { PropsWithChildren } from "react";

function TeamsHeader() {
  return <h2 className={`logo-subtitle my-5 text-3xl`}>My Teams</h2>;
}

function TeamsContainer({ children }: PropsWithChildren) {
  return (
    <div
      className={`teams-form mt-4 flex flex-col items-center gap-2`}
      style={{ minWidth: "50vw", marginBottom: "30px" }}
    >
      {children}
    </div>
  );
}

export default function TeamsLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <TeamsHeader />
      <TeamsContainer>{children}</TeamsContainer>
    </>
  );
}
