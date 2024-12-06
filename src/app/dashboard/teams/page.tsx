// import { HydrateClient } from "~/trpc/server";
import TeamsContent from "./content";

export default async function Teams() {
  return (
    // <HydrateClient>
    <TeamsContent />
    // </HydrateClient>
  );
}
