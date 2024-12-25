import { useMemo, useState } from "react";
import { Roster as RosterType } from "../../teams/_components/TeamInfo";

type RecsFormValues = {
  ppr: "NO" | "0.5" | "1.0";
  superflex: "YES" | "NO";
  draftPosition: number;
  // possibleDraftPositions: Array<number>;
  numOfTeams: number;
  roster: RosterType;
};

export default function useRecommendationForm() {
  const [formState, setFormState] = useState<RecsFormValues>();

  const handleFormChange = (values: RecsFormValues) => {
    // const newFormState = formState ?? ({} as RecsFormValues);
    // const newValues = { ...newFormState, [field]: value };
    setFormState(values);
  };

  return {
    formState,
    handleFormChange,
  };
}
