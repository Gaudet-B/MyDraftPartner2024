import { PropsWithChildren } from "react";

export function H1({ children }: PropsWithChildren) {
  return <h1 className="text-4xl">{children}</h1>;
}

export function H2({ children }: PropsWithChildren) {
  return <h2 className="text-3xl">{children}</h2>;
}

export function H3({ children }: PropsWithChildren) {
  return <h3 className="text-2xl">{children}</h3>;
}
