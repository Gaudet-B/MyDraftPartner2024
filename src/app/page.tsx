import { HydrateClient } from "~/trpc/server";
import FieldBackground from "./_components/background/FieldBackground";

export default async function Home() {
  return (
    <HydrateClient>
      <FieldBackground />
    </HydrateClient>
  );
}
