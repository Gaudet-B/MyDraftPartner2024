import { Player as PlayerType } from "@prisma/client";
import { Roster as RosterType } from "~/app/dashboard/teams/_components/TeamInfo/info";
import {
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableContainer,
  TableHead,
  TableHeadCell,
  TableHeadRow,
} from "../table";
import { Column, ColumnInput, generateColumns } from "../table/util";
import { backgroundColors } from "../colors";

function HeadSeparator({
  darkMode,
  length,
}: {
  darkMode?: boolean;
  length: number;
}) {
  return (
    <tr
      className={`h-2 ${darkMode ? backgroundColors.darkSecondary : backgroundColors.lightSecondary}`}
    >
      {Array.from({ length }).map((_, idx) => (
        <th key={`head-separator-${idx}`} className="" />
      ))}
    </tr>
  );
}

function Head({
  darkMode,
  columns,
}: {
  darkMode: boolean;
  columns: Array<Column>;
}) {
  return (
    <TableHead>
      <TableHeadRow
        className={
          darkMode
            ? backgroundColors.darkSecondary
            : backgroundColors.lightSecondary
        }
      >
        {columns.map((col, idx) => (
          <TableHeadCell
            key={`column-header-${idx}-${col.label}`}
            topLeft={idx === 0}
            topRight={idx === columns.length - 1}
          >
            {col.label === "currentAdp" ? "adp" : idx < 2 ? "" : col.label}
          </TableHeadCell>
        ))}
      </TableHeadRow>

      <HeadSeparator darkMode={darkMode} length={columns.length} />
    </TableHead>
  );
}

function BodySeparator({
  darkMode,
  length,
}: {
  darkMode?: boolean;
  length: number;
}) {
  return (
    <tr
      className={`h-2 ${darkMode ? backgroundColors.darkSecondary : backgroundColors.lightSecondary}`}
    >
      {Array.from({ length }).map((_, idx) => (
        <td key={`body-separator-${idx}`} className="" />
      ))}
    </tr>
  );
}

function Body({
  darkMode,
  columns,
  starters,
  bench,
  positions,
}: {
  darkMode: boolean;
  columns: Array<Column>;
  starters: Array<PlayerType>;
  bench: Array<PlayerType>;
  positions: Array<Uppercase<keyof RosterType>>;
}) {
  return (
    <TableBody>
      {starters.map((player, idx) => (
        <TableBodyRow
          key={`starters-row-${idx}-${player.position}`}
          className={idx % 2 === 0 ? "bg-gray-100" : ""}
        >
          {columns.map((col, i) => (
            <TableBodyCell key={`starters-row-${idx}-cell-${i}-${col.label}`}>
              {i === 0 && positions[idx]}
              {i !== 0 && col.getValue(player)}
            </TableBodyCell>
          ))}
        </TableBodyRow>
      ))}

      <BodySeparator darkMode={darkMode} length={columns.length} />

      {bench.map((player, idx) => (
        <TableBodyRow
          key={`bench-row-${idx}-${player.position}`}
          className={idx % 2 === 0 ? "bg-gray-100" : ""}
        >
          {columns.map((col, i) => (
            <TableBodyCell key={`bench-row-${idx}-cell${i}-${col.label}`}>
              {i !== 0 && col.getValue(player)}
            </TableBodyCell>
          ))}
        </TableBodyRow>
      ))}
    </TableBody>
  );
}

function _sortPositions(
  a: Uppercase<keyof RosterType>,
  b: Uppercase<keyof RosterType>,
) {
  const positions = ["QB", "RB", "WR", "TE", "K", "DST", "FLEX"];
  return positions.indexOf(a) - positions.indexOf(b);
}

function _getStartersPositions(rosterSettings: RosterType) {
  const positions: Array<Uppercase<keyof RosterType>> = [];
  Object.keys(rosterSettings).forEach((p) => {
    const pos = p as keyof typeof rosterSettings;
    if (pos !== "bench") {
      const { starters } = rosterSettings[pos];
      for (let i = 0; i < starters; i++) {
        const position = pos.toUpperCase() as Uppercase<keyof RosterType>;
        positions.push(position);
      }
    }
  });
  return positions.sort((a, b) => _sortPositions(a, b));
}

export function RosterTable({
  columns,
  starters,
  bench,
  rosterSettings,
  // darkMode = false,
  theme = "light",
}: {
  // columns: Array<ColumnInput | string>;
  columns: (theme: "dark" | "light") => Array<ColumnInput | string>;
  starters: Array<PlayerType>;
  bench: Array<PlayerType>;
  rosterSettings: RosterType;
  // darkMode?: boolean;
  theme?: "dark" | "light";
}) {
  const formattedColumns = generateColumns(columns(theme));
  const formattedPositions = _getStartersPositions(rosterSettings);
  return (
    <TableContainer className="w-full p-2">
      <Head columns={formattedColumns} darkMode={theme === "dark"} />
      <Body
        columns={formattedColumns}
        darkMode={theme === "dark"}
        starters={starters}
        bench={bench}
        positions={formattedPositions}
      />
    </TableContainer>
  );
}
