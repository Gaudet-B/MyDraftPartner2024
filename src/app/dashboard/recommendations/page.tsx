import { HydrateClient } from "~/trpc/server";

export default async function Recommendations() {
  return (
    <HydrateClient>
      <div>
        <h1>Recommendations</h1>
      </div>
    </HydrateClient>
  );
}
