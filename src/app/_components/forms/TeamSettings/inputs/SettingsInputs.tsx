import SettingsGroup from "../groups/SettingsGroup";
import RadioGroup from "../groups/RadioGroup";
import {
  Roster,
  TeamSettings as TeamSettingsType,
} from "~/app/dashboard/teams/_components/TeamInfo/info";
import {
  NUM_OF_TEAMS,
  PPR_OPTIONS,
  ROSTER_OPTIONS,
  SUPERFLEX_OPTIONS,
} from "~/app/_components/forms/TeamSettings/const";
import RosterDetails from "./RosterDetails";
import { SettingsValuesType } from "~/app/dashboard/teams/_components/TeamInfo/content";

/**
 * @NOTE
 * `handleRadioChange` changes the form state ("settings" section)
 * the separate `handleClick` functions for "ppr", "superflex", and "numOfTeams" just convert the value then call `handleRadioChange`
 *
 * do we need two separate functions so one can be passed to the RadioGroup's `onChange` prop?
 * or can we pass the same function to both `onClick` and `onChange`?
 *
 * ...trying with one first
 */

export function SettingsInputs({
  // possibleDraftPositions,
  // draftPosition,
  // numberOfTeams,
  // ppr,
  // superflex,
  teamSettings,
  values,
  // setDraftPosition,
  // setNumberOfTeams,
  // setPpr,
  // setSuperflex,
  handleClick,
  // handleTeamsClick,
  // handlePPRClick,
  // handleSuperflexClick,
  // handleRadioChange,
  handleRosterChange,
  darkMode = false,
  editMode = false,
}: {
  // possibleDraftPositions: number[];
  // draftPosition: TeamSettingsType["draftPosition"];
  // numberOfTeams: TeamSettingsType["numOfTeams"];
  // ppr: string;
  // superflex: string;
  teamSettings: TeamSettingsType;
  values: SettingsValuesType;
  // setDraftPosition: (value: number) => void;
  // setNumberOfTeams: (value: number) => void;
  // setPpr: (value: string) => void;
  // setSuperflex: (value: string) => void;
  handleClick: (
    field: keyof TeamSettingsType,
    value: number | boolean | string,
  ) => void;
  // handleTeamsClick: (value: number | boolean | string) => void;
  // handlePPRClick: (value: string) => void;
  // handleSuperflexClick: (value: string) => void;
  // handleRadioChange: (
  //   field: keyof TeamSettingsType,
  //   value: number | boolean | string,
  // ) => void;
  handleRosterChange: (
    position: keyof Roster,
    startersOrMax: "starters" | "max",
    value: number,
  ) => void;
  darkMode?: boolean;
  editMode?: boolean;
}) {
  const { possibleDraftPositions, draftPosition, numOfTeams, ppr, superflex } =
    values;

  return (
    <div className={`text-md grid grid-cols-2 gap-5 text-right font-normal`}>
      <SettingsGroup
        label={"no. teams in league"}
        // screen reader label
        form={`number of teams`}
        // items={NUM_OF_TEAMS}
        editMode={editMode}
        darkMode={darkMode}
        value={numOfTeams}
      >
        <RadioGroup
          htmlFor="numOfTeams"
          items={NUM_OF_TEAMS}
          //sends back the value of the radio button, does all logic stuff
          handleClick={(v) => handleClick("numOfTeams", v)}
          // selected and setSelected handle the headlessui funcionality
          selected={numOfTeams}
          // setSelected={setNumberOfTeams}
          // handleChange={v => handleRadioChange('numOfTeams', v)}
          handleChange={(v) => handleClick("numOfTeams", v)}
          // screen reader label
          form={`number of teams`}
        />
      </SettingsGroup>

      <SettingsGroup
        label={"PPR"}
        form={`p p r`}
        editMode={editMode}
        darkMode={darkMode}
        value={ppr}
      >
        <RadioGroup
          /** @TODO whyyyyy */
          // handleClick={(value: string | number | boolean) => {
          //   if (typeof value !== "string") return;
          //   handlePPRClick(value);
          // }}
          htmlFor="ppr"
          items={PPR_OPTIONS}
          handleClick={(v) => handleClick("ppr", v)}
          selected={ppr}
          // setSelected={setPpr}
          // handleChange={v => handleRadioChange('ppr', v)}
          handleChange={(v) => handleClick("ppr", v)}
          form={"p p r"}
        />
      </SettingsGroup>

      <SettingsGroup
        label={"Superflex"}
        form={`super flex`}
        editMode={editMode}
        darkMode={darkMode}
        value={superflex}
      >
        <RadioGroup
          // handleClick={(value: string | number | boolean) => {
          //   if (typeof value !== "string") return;
          //   handleSuperflexClick(value);
          // }}
          htmlFor="superflex"
          items={SUPERFLEX_OPTIONS}
          handleClick={(v) => handleClick("superflex", v)}
          selected={superflex}
          // setSelected={setSuperflex}
          // handleChange={v => handleRadioChange('superflex', v)}
          handleChange={(v) => handleClick("superflex", v)}
          form={"super flex"}
        />
      </SettingsGroup>

      {possibleDraftPositions && possibleDraftPositions.length > 0 && (
        <SettingsGroup
          label={"draft position"}
          form={`draft position`}
          editMode={editMode}
          darkMode={darkMode}
          value={draftPosition}
        >
          <div className={`flex flex-col gap-1`}>
            {possibleDraftPositions.length > 8 ? (
              <>
                <RadioGroup
                  // handleClick={(value) =>
                  //   handleRadioChange("draftPosition", value)
                  // }
                  htmlFor="draftPosition"
                  handleClick={(v) => handleClick("draftPosition", v)}
                  form={"draft position"}
                  items={possibleDraftPositions.slice(0, 8)}
                  selected={draftPosition}
                  // setSelected={setDraftPosition}
                  handleChange={(v) => handleClick("draftPosition", v)}
                />
                <RadioGroup
                  // handleClick={(value) =>
                  //   handleRadioChange("draftPosition", value)
                  // }
                  htmlFor="draftPosition"
                  handleClick={(v) => handleClick("draftPosition", v)}
                  form={"draft position"}
                  items={possibleDraftPositions.slice(8)}
                  selected={draftPosition}
                  // setSelected={setDraftPosition}
                  handleChange={(v) => handleClick("draftPosition", v)}
                />
              </>
            ) : (
              <RadioGroup
                // handleClick={(value) => handleRadioChange("draftPosition", value)}
                htmlFor="draftPosition"
                handleClick={(v) => handleClick("draftPosition", v)}
                form={"draft position"}
                items={possibleDraftPositions}
                selected={draftPosition}
                // setSelected={setDraftPosition}
                handleChange={(v) => handleClick("draftPosition", v)}
              />
            )}
          </div>
        </SettingsGroup>
      )}

      {teamSettings.roster && (
        <SettingsGroup
          label={"roster"}
          form={`roster`}
          editMode={editMode}
          darkMode={darkMode}
        >
          <RosterDetails
            rosterDetails={teamSettings.roster}
            handleNumberChange={handleRosterChange}
            items={ROSTER_OPTIONS as Array<keyof Roster>}
            editMode={editMode}
          />
        </SettingsGroup>
      )}
    </div>
  );
}
