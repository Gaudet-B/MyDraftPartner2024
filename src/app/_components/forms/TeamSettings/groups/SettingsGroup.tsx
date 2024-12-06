import { PropsWithChildren } from "react";

function ValueContainer({
  value,
  darkMode = false,
}: {
  value?: string | number | boolean;
  darkMode: boolean;
}) {
  return (
    <div
      className={`flex flex-row items-center justify-start text-center text-base font-bold`}
    >
      <div
        className={`flex flex-row items-center justify-center border-2 border-double ${
          darkMode ? "border-gray-600" : "border-gray-200"
        } h-12 w-12 rounded-lg p-2`}
      >
        <span>{value || " "}</span>
      </div>
    </div>
  );
}

export default function SettingsGroup({
  children,
  darkMode,
  editMode,
  form,
  label,
  value,
}: PropsWithChildren<{
  darkMode: boolean;
  editMode: boolean;
  form: string;
  label: string;
  value?: string | number | boolean;
}>) {
  return (
    <>
      <label
        className={`flex flex-col justify-center leading-relaxed`}
        htmlFor={form}
      >
        <span>{label}</span>
      </label>
      {editMode ? (
        children
      ) : (
        <ValueContainer value={value} darkMode={darkMode} />
      )}
    </>
  );
}
