import { PropsWithChildren } from "react";

export default function H1({ children }: PropsWithChildren) {
  return <h1 className="text-4xl">{children}</h1>;
}
