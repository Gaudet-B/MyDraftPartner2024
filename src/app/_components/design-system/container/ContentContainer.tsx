import { PropsWithChildren } from "react";

function Container({
  children,
  activeClasses = "bg-gray-300 border-gray-100 text-gray-900",
}: PropsWithChildren<{ activeClasses?: string }>) {
  return (
    /** @TODO grab custom CSS from 'content-container' class */
    <div
      className={`tracking-light content-container relative z-10 flex flex-col items-center rounded-2xl border bg-opacity-90 p-5 text-center shadow-lg ${activeClasses} `}
    >
      {children}
    </div>
  );
}

export default function ContentContainer({
  children,
  darkMode,
}: {
  children: React.ReactNode;
  darkMode: boolean;
  // customStyles?: React.CSSProperties
}) {
  const activeClasses = darkMode
    ? "bg-gray-700 font-semibold border-gray-900 text-gray-100"
    : undefined;
  return <Container {...{ activeClasses }}>{children}</Container>;
}
