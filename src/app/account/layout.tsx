import { PropsWithChildren } from "react";
import { Navigation } from "../_components/navigation";

export default function AccountLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <>
      <Navigation />
      {/** @TODO remove bg color from here and move to design-system */}
      <div className="min-h-screen w-full bg-gray-100">{children}</div>
    </>
  );
}
