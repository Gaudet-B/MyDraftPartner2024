import { PropsWithChildren } from "react";

export function FormContainer({ children }: PropsWithChildren) {
  return (
    <div
      className={`text-right`}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "20px",
      }}
    >
      {children}
    </div>
  );
}

export function FormLabel({
  children,
  for: htmlFor,
}: PropsWithChildren<{ for: string }>) {
  return (
    <label className={`flex flex-col justify-center`} htmlFor={htmlFor}>
      <span>{children}</span>
    </label>
  );
}
