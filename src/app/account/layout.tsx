import { PropsWithChildren } from "react";
import Navigation from "@components/navigation/navigation";

export default function AccountLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="w-ful flex min-h-screen flex-col">
      <Navigation />
      {children}
    </div>
  );
}
