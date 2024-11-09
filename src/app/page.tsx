import { api, HydrateClient } from "~/trpc/server";
import FieldBackground from "./_components/background/FieldBackground";

// const BACKGROUND = "bg-[#374151]"
const BACKGROUND = "bg-[#4F8918]";

export default async function Home() {
  const players = await api.player.getAll();

  return (
    <HydrateClient>
      <div className={`${BACKGROUND}`}>
        {/* <h1>MyDraft Partner 2024</h1>
        <p>2024 Fantasy Football draft hub</p> */}
        {/* <ul>
          {players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul> */}
        <FieldBackground />
      </div>
    </HydrateClient>
  );
}
