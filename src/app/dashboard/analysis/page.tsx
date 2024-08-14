import { HydrateClient } from "~/trpc/server";

export default async function Analysis() {
  return (
    <HydrateClient>
      <div>
        <h1>Analysis</h1>
      </div>
    </HydrateClient>
  );
}
