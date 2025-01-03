import { backgroundColors } from "@designsystem/colors";

export default function InnerContainer({
  darkMode,
  children,
}: {
  darkMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded px-2 py-1 text-start ${darkMode ? backgroundColors.darkTertiary : backgroundColors.lightTertiary}`}
    >
      {children}
    </div>
  );
}
