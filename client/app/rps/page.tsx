"use client";
// index.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const generateRandomString = (length: number) => {
  let result = "";
  const characters = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleCreateLobby = () => {
    const newRoomId = generateRandomString(6);
    setRoomId(newRoomId);

    // Redirect to the new room
    router.push(`/rps/room/${newRoomId}`);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <div>Room ID: {roomId}</div>
      <button onClick={handleCreateLobby}>Create Lobby</button>
    </main>
  );
};

export default Home;
