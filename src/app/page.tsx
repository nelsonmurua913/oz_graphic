"use client";
import { PlayerInterface, getPlayers } from "@/library/graphql/query";
import { ClientToServerEvents, ServerToClientEvents } from "@/library/models/socketModel";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";



export default function Home() {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {transports:['websocket']});
  const [players, setPlayers] = useState<PlayerInterface[]>([]);
  const fetch = async () => {
    const players_ = await getPlayers();
    setPlayers(players_);
  };

  useEffect(() => {
    socket.on("match-info", (data) => {
      console.log(data);
    });
    // return () => {
    //   socket.off("match-info");
    // };
  }, [socket]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex gap-4">
        {players?.length > 0 && players.map((player, index) => {
          return (
            <div key={index} className="block">
              {player.team.teamNumber} - {player.pno}: {player.firstName} {player.familyName}
            </div>
          );
        })}
      </div>
    </main>
  );
}
