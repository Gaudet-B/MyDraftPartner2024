import { HydrateClient } from "~/trpc/server";

export default async function Settings() {
  return (
    <HydrateClient>
      <div>
        <h1>Settings</h1>
        <p>Update your settings here</p>
      </div>
    </HydrateClient>
  );
}
