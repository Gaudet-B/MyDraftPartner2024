import { backgroundColors } from "@designsystem/colors";

export default function OuterContainer({
  darkMode,
  children,
}: {
  darkMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex w-full flex-col justify-stretch gap-2 rounded-lg p-2 ${darkMode ? backgroundColors.darkSecondary : backgroundColors.lightSecondary}`}
    >
      {children}
    </div>
  );
}
