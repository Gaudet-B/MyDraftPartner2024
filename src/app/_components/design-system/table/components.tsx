import { PropsWithChildren } from "react";

export function TableContainer({
  children,
  ...props
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div {...props}>
      <Table className="w-full">{children}</Table>
    </div>
  );
}

export function Table({
  children,
  ...props
}: PropsWithChildren<{ className?: string }>) {
  return <table {...props}>{children}</table>;
}

export function TableHead({
  children,
  ...props
}: PropsWithChildren<{ className?: string }>) {
  return <thead {...props}>{children}</thead>;
}

export function TableHeadRow({
  children,
  ...props
}: PropsWithChildren<{ className?: string }>) {
  return <tr {...props}>{children}</tr>;
}

export function TableHeadCell({
  children,
  topLeft,
  topRight,
}: PropsWithChildren & { topLeft?: boolean; topRight?: boolean }) {
  return (
    <th
      className={`${topLeft ? "rounded-tl-lg" : ""} ${topRight ? "rounded-tr-lg" : ""}`}
    >
      {children}
    </th>
  );
}

export function TableBody({ children }: PropsWithChildren) {
  return <tbody>{children}</tbody>;
}

export function TableBodyRow({
  children,
  ...props
}: PropsWithChildren<{ className?: string }>) {
  return <tr {...props}>{children}</tr>;
}

export function TableBodyCell({ children }: PropsWithChildren) {
  return <td>{children}</td>;
}
