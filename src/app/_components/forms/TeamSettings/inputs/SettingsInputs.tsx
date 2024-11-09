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

export function SettingsInputs({
  possibleDraftPositions,
  draftPosition,
  numberOfTeams,
  ppr,
  superflex,
  teamSettings,
  setDraftPosition,
  setNumberOfTeams,
  setPpr,
  setSuperflex,
  handleTeamsClick,
  handlePPRClick,
  handleSuperflexClick,
  handleRadioChange,
  handleRosterChange,
  darkMode = false,
  editMode = false,
}: {
  possibleDraftPositions: number[];
  draftPosition: TeamSettingsType["draftPosition"];
  numberOfTeams: TeamSettingsType["numOfTeams"];
  ppr: string;
  superflex: string;
  teamSettings: TeamSettingsType;
  setDraftPosition: (value: number) => void;
  setNumberOfTeams: (value: number) => void;
  setPpr: (value: string) => void;
  setSuperflex: (value: string) => void;
  handleTeamsClick: (value: number | boolean | string) => void;
  handlePPRClick: (value: string) => void;
  handleSuperflexClick: (value: string) => void;
  handleRadioChange: (
    field: keyof TeamSettingsType,
    value: number | boolean | string,
  ) => void;
  handleRosterChange: (
    position: keyof Roster,
    startersOrMax: "starters" | "max",
    value: number,
  ) => void;
  darkMode?: boolean;
  editMode?: boolean;
}) {
  return (
    <>
      <SettingsGroup
        label={"no. teams in league"}
        // screen reader label
        form={`number of teams`}
        // items={NUM_OF_TEAMS}
        editMode={editMode}
        darkMode={darkMode}
        value={numberOfTeams}
      >
        <RadioGroup
          //sends back the value of the radio button, does all logic stuff
          handleClick={handleTeamsClick}
          // selected and setSelected handle the headlessui funcionality
          selected={numberOfTeams}
          setSelected={setNumberOfTeams}
          // screen reader label
          form={`number of teams`}
          items={NUM_OF_TEAMS}
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
          handleClick={(value: string | number | boolean) => {
            if (typeof value !== "string") return;
            handlePPRClick(value);
          }}
          form={"p p r"}
          items={PPR_OPTIONS}
          selected={ppr}
          setSelected={setPpr}
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
          handleClick={(value: string | number | boolean) => {
            if (typeof value !== "string") return;
            handleSuperflexClick(value);
          }}
          form={"super flex"}
          items={SUPERFLEX_OPTIONS}
          selected={superflex}
          setSelected={setSuperflex}
        />
      </SettingsGroup>

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
                handleClick={(value) =>
                  handleRadioChange("draftPosition", value)
                }
                form={"draft position"}
                items={possibleDraftPositions.slice(0, 8)}
                selected={draftPosition}
                setSelected={setDraftPosition}
              />
              <RadioGroup
                handleClick={(value) =>
                  handleRadioChange("draftPosition", value)
                }
                form={"draft position"}
                items={possibleDraftPositions.slice(8)}
                selected={draftPosition}
                setSelected={setDraftPosition}
              />
            </>
          ) : (
            <RadioGroup
              handleClick={(value) => handleRadioChange("draftPosition", value)}
              form={"draft position"}
              items={possibleDraftPositions}
              selected={draftPosition}
              setSelected={setDraftPosition}
            />
          )}
        </div>
      </SettingsGroup>

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
    </>
  );
}
