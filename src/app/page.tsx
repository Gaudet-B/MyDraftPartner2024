import { api, HydrateClient } from "~/trpc/server";
import FieldBackground from "./_components/background/FieldBackground";

export default async function Home() {
  const players = await api.player.getAll();

  return (
    <HydrateClient>
      <div>
        <h1>MyDraft Partner 2024</h1>
        <p>2024 Fantasy Football draft hub</p>
        {/* <ul>
          {players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul> */}
        <div className="h-screen w-screen">
          <FieldBackground />
        </div>
      </div>
    </HydrateClient>
  );
}
