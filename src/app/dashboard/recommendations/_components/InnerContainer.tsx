import { backgroundColors } from "@designsystem/colors";

export default function InnerContainer({
  darkMode,
  label,
  content,
}: {
  darkMode: boolean;
  label: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="flex grow items-stretch gap-2 text-start font-semibold">
      <div
        className={`col-span-8 rounded-md px-2 py-1 text-start ${darkMode ? backgroundColors.darkAccent : backgroundColors.lightAccent}`}
      >
        {label}
      </div>
      <div
        className={`col-span-8 grow rounded-md px-2 py-1 text-start ${darkMode ? backgroundColors.darkTertiary : backgroundColors.lightTertiary}`}
      >
        {content}
      </div>
    </div>
  );
}
