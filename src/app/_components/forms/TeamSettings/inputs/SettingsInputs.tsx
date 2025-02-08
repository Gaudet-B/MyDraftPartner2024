import SettingsGroup from "../groups/SettingsGroup";
import RadioGroup from "../groups/RadioGroup";
import { Roster } from "~/app/dashboard/teams/_components/TeamInfo/info";
import {
  NUM_OF_TEAMS,
  PPR_OPTIONS,
  ROSTER_OPTIONS,
  SUPERFLEX_OPTIONS,
} from "@components/forms/TeamSettings/const";
import RosterDetails from "./RosterDetails";
import { SettingsValuesType } from "~/app/dashboard/teams/hooks/useTeamForm";
import { getPossibleDraftPositions } from "~/app/dashboard/teams/util";
import { PropsWithChildren, useState } from "react";

const SettingsGrid = ({
  children,
  editMode,
}: PropsWithChildren<{ editMode: boolean }>) => (
  <div
    className={`text-md grid ${editMode ? "grid-cols-3" : "grid-cols-2"} gap-5 text-right font-normal`}
  >
    {children}
  </div>
);

export function SettingsInputs({
  values,
  handleClick,
  handleRosterChange,
  hideRosterLabel,
  darkMode = false,
  editMode = false,
}: {
  values: SettingsValuesType;
  handleClick: (
    field: keyof SettingsValuesType,
    value: SettingsValuesType[typeof field],
  ) => void;
  handleRosterChange: (
    position: keyof Roster,
    startersOrMax: "starters" | "max",
    change: -1 | 1,
  ) => void;
  hideRosterLabel?: boolean;
  darkMode?: boolean;
  editMode?: boolean;
}) {
  const { draftPosition, numOfTeams, ppr, roster, superflex } = values;

  const [possibleDraftPositions, setPossibleDraftPositions] = useState<
    Array<number>
  >(getPossibleDraftPositions(numOfTeams));

  const handleNumOfTeamsChange = (value: number) => {
    handleClick("numOfTeams", value);
    setPossibleDraftPositions(getPossibleDraftPositions(value));
  };

  return (
    <SettingsGrid editMode={editMode}>
      <SettingsGroup
        label={"no. teams in league"}
        // screen reader label
        form={`number of teams`}
        editMode={editMode}
        darkMode={darkMode}
        value={numOfTeams}
      >
        <div className={editMode ? "col-span-2" : "col-span-1"}>
          <RadioGroup
            htmlFor="numOfTeams"
            items={NUM_OF_TEAMS}
            //sends back the value of the radio button, does all logic stuff
            handleClick={(v) => handleNumOfTeamsChange(v as number)}
            // selected and setSelected handle the headlessui funcionality
            selected={numOfTeams}
            handleChange={(v) => handleNumOfTeamsChange(v as number)}
            // screen reader label
            form={`number of teams`}
          />
        </div>
      </SettingsGroup>

      <SettingsGroup
        label={"PPR"}
        form={`p p r`}
        editMode={editMode}
        darkMode={darkMode}
        value={ppr}
      >
        <div className={editMode ? "col-span-2" : "col-span-1"}>
          <RadioGroup
            htmlFor="ppr"
            items={PPR_OPTIONS}
            handleClick={(v) => handleClick("ppr", v)}
            selected={ppr}
            handleChange={(v) => handleClick("ppr", v)}
            form={"p p r"}
          />
        </div>
      </SettingsGroup>

      <SettingsGroup
        label={"Superflex"}
        form={`super flex`}
        editMode={editMode}
        darkMode={darkMode}
        value={superflex}
      >
        <div className={editMode ? "col-span-2" : "col-span-1"}>
          <RadioGroup
            htmlFor="superflex"
            items={SUPERFLEX_OPTIONS}
            handleClick={(v) => handleClick("superflex", v)}
            selected={superflex}
            handleChange={(v) => handleClick("superflex", v)}
            form={"super flex"}
          />
        </div>
      </SettingsGroup>

      {possibleDraftPositions && possibleDraftPositions.length > 0 && (
        <SettingsGroup
          label={"draft position"}
          form={`draft position`}
          editMode={editMode}
          darkMode={darkMode}
          value={draftPosition}
        >
          <div
            className={`${editMode ? "col-span-2" : "col-span-1"} flex flex-col gap-1`}
          >
            {possibleDraftPositions.length > 8 ? (
              <>
                <RadioGroup
                  htmlFor="draftPosition"
                  handleClick={(v) => handleClick("draftPosition", v)}
                  form={"draft position"}
                  items={possibleDraftPositions.slice(0, 8)}
                  selected={draftPosition}
                  handleChange={(v) => handleClick("draftPosition", v)}
                />
                <RadioGroup
                  htmlFor="draftPosition"
                  handleClick={(v) => handleClick("draftPosition", v)}
                  form={"draft position"}
                  items={possibleDraftPositions.slice(8)}
                  selected={draftPosition}
                  handleChange={(v) => handleClick("draftPosition", v)}
                />
              </>
            ) : (
              <RadioGroup
                htmlFor="draftPosition"
                handleClick={(v) => handleClick("draftPosition", v)}
                form={"draft position"}
                items={possibleDraftPositions}
                selected={draftPosition}
                handleChange={(v) => handleClick("draftPosition", v)}
              />
            )}
          </div>
        </SettingsGroup>
      )}

      {values.roster && (
        <SettingsGroup
          label={hideRosterLabel ? undefined : "roster"}
          form={`roster`}
          darkMode={darkMode}
          editMode
        >
          <div
            className={
              hideRosterLabel
                ? "col-span-2"
                : editMode
                  ? "col-span-2"
                  : "col-span-1"
            }
          >
            <RosterDetails
              darkMode={darkMode}
              editMode={editMode}
              items={ROSTER_OPTIONS}
              rosterDetails={roster}
              handleNumberChange={handleRosterChange}
            />
          </div>
        </SettingsGroup>
      )}
    </SettingsGrid>
  );
}
