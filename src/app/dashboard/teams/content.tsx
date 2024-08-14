"use client";

import { useState } from "react";
import { Team } from "@prisma/client";
import { NewTeamButton, TeamButtons } from "./_components/TeamButtons";
import TeamInfo from "./_components/TeamInfo";

export default function TeamsContent({ teams }: { teams: Array<Team> }) {
  const [activeTeam, setActiveTeam] = useState<Team["name"]>();
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleActiveTeam = (name: Team["name"]) => setActiveTeam(name);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  return (
    <>
      <TeamButtons
        teams={teams}
        activeTeam={activeTeam}
        handleClick={handleActiveTeam}
      />
      <TeamInfo />
      <NewTeamButton
        addTeam={showForm}
        handleClick={showForm ? handleShowForm : handleHideForm}
      />
    </>
  );
}
