"use client";

import { useMemo, useState } from "react";
import { Team } from "@prisma/client";
import { NewTeamButton, TeamButtons } from "./_components/TeamButtons";
import TeamInfo from "./_components/TeamInfo";
import TeamForm from "./_components/TeamForm";

export default function TeamsContent({ teams }: { teams: Array<Team> }) {
  const [activeTeam, setActiveTeam] = useState<Team["name"]>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleActiveTeam = (name: Team["name"]) => setActiveTeam(name);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  const team = useMemo(
    () => teams.find((team) => team.name === activeTeam),
    [activeTeam],
  );

  return (
    <>
      <TeamButtons
        teams={teams}
        activeTeam={activeTeam}
        handleClick={handleActiveTeam}
      />
      {team && <TeamInfo team={team} />}
      <NewTeamButton
        addTeam={showForm}
        handleClick={showForm ? handleShowForm : handleHideForm}
      />
      {showForm && (
        <TeamForm handleSumbit={handleSubmit} showSettings={showSettings} />
      )}
    </>
  );
}
