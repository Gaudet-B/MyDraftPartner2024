"use client";

import { PropsWithChildren } from "react";
import { Team } from "@prisma/client";
import Button from "@designsystem/button";

function ButtonsContainer({ children }: PropsWithChildren) {
  return (
    <div
      className={`flex max-w-[90%] flex-row flex-wrap items-center justify-evenly gap-4 font-serif`}
    >
      {children}
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
    <div className={`flex justify-center`}>
      <span>{`${text} (`}</span>
      <div className={`flex justify-center`} style={transform}>
        <span className={"h-[24px] w-[24px]"}>{icon}</span>
      </div>
      <span>{`)`}</span>
    </div>
  );
}

function TeamButton({
  activeTeam,
  idx,
  name,
  handleClick,
}: {
  activeTeam?: string;
  idx: number;
  name: Team["name"];
  handleClick: () => void;
}) {
  return (
    <Button
      key={`team-${name}-${idx}-button`}
      onClick={handleClick}
      theme={activeTeam === name ? "action-lg" : "transparent-hover"}
      additionalClasses={
        activeTeam === name ? "scale-100 font-mono" : "scale-80 font-mono"
      }
      children={name}
    />
  );
}

export function TeamButtons({
  teams,
  activeTeam,
  handleClick,
}: {
  teams: Array<Team>;
  activeTeam?: Team["name"];
  handleClick: (n: Team["name"]) => void;
}) {
  return (
    <ButtonsContainer>
      {teams.map((team, idx) => (
        <TeamButton
          idx={idx}
          name={team.name}
          activeTeam={activeTeam}
          handleClick={() => handleClick(team.name)}
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
    <Button onClick={handleClick} theme="transparent-hover">
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
