import { PropsWithChildren } from "react";
import { Team } from "@prisma/client";
import Button from "@designsystem/button";
import { textColors } from "~/app/_components/design-system/colors/text";

function ButtonsContainer({ children }: PropsWithChildren) {
  return (
    <div className="w-4/5">
      <div
        className={`flex w-full flex-row flex-wrap items-center justify-evenly gap-4 px-4 py-2 font-serif`}
      >
        {children}
      </div>
    </div>
  );
}

function TextWithIcon({
  icon,
  text,
  transform,
}: {
  icon: string;
  text: string;
  transform: React.CSSProperties;
}) {
  return (
    <div className={`flex w-[150px] items-baseline justify-between`}>
      <div className="grow text-center">
        <span>{`${text}`}</span>
      </div>
      <div className="flex text-xl">
        {/* <span>{`(`}</span> */}
        <div className={`flex justify-center`} style={transform}>
          <span className={icon === "+" ? "-translate-y-1" : ""}>{icon}</span>
        </div>
        {/* <span>{`)`}</span> */}
      </div>
    </div>
  );
}

function TeamButton({
  activeTeam,
  darkMode,
  idx,
  name,
  teamId,
  handleClick,
}: {
  activeTeam?: Team["id"];
  darkMode: boolean;
  idx: number;
  name: Team["name"];
  teamId: Team["id"];
  handleClick: () => void;
}) {
  return (
    <Button
      key={`team-${name}-${idx}-button`}
      onClick={handleClick}
      theme={activeTeam === teamId ? "action-lg" : "transparent-hover"}
      additionalClasses={`${darkMode ? textColors.lightTertiary : textColors.darkTertiary} ${activeTeam === teamId ? "scale-100 font-mono" : "scale-80 font-mono"}`}
      children={name}
    />
  );
}

export function TeamButtons({
  teams,
  darkMode,
  activeTeam,
  handleClick,
}: {
  teams?: Array<Team>;
  darkMode: boolean;
  activeTeam?: Team["id"];
  handleClick: (id: Team["id"] | undefined) => void;
}) {
  return (
    <ButtonsContainer>
      {teams &&
        teams.map((team, idx) => (
          <TeamButton
            idx={idx}
            name={team.name}
            teamId={team.id}
            darkMode={darkMode}
            activeTeam={activeTeam}
            handleClick={() =>
              handleClick(activeTeam === team.id ? undefined : team.id)
            }
          />
        ))}
    </ButtonsContainer>
  );
}

export function NewTeamButton({
  addTeam,
  handleClick,
}: {
  addTeam: boolean;
  handleClick: () => void;
}) {
  return (
    <Button onClick={handleClick} theme="action">
      <TextWithIcon
        icon={addTeam ? "-" : "+"}
        text={addTeam ? "click to hide" : "create new team"}
        transform={
          addTeam
            ? {
                transform: "rotateZ(360deg)",
                transition: ".2s transform",
                width: "24px",
              }
            : {
                transform: "rotateZ(-360deg)",
                transition: ".2s transform",
                width: "24px",
              }
        }
      />
    </Button>
  );
}
