import { PropsWithChildren } from "react";

export function FormContainer({ children }: PropsWithChildren) {
  return <div className={`grid grid-cols-3 gap-5 text-right`}>{children}</div>;
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

export function FormTitle({ children }: PropsWithChildren) {
  return <span className={`text-xl`}>{children}</span>;
}
