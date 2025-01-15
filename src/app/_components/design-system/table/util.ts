type TableRow = Record<string, unknown>;

export type Column = {
  getValue: (row: TableRow) => React.ReactNode;
  label: string;
  width?: string;
};

export type ColumnInput = Partial<Column> | string;

const defaultColumn = (label: string): Column => ({
  label: label,
  getValue: (row: TableRow) => row[label] as React.ReactNode,
});

/** @TODO make this do stuff */
const customColumn = (column: Column): Column => ({ ...column });

export function generateColumns(columns: Array<ColumnInput>) {
  return columns.map((column) => {
    if (typeof column === "string") return defaultColumn(column);
    if (!column.getValue && column.label) return defaultColumn(column.label);
    return customColumn(column as Column);
  });
}
