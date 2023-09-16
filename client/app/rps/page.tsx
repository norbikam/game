// Home.tsx
import React from "react";
import { Button } from "@chakra-ui/react";
import { useRoom } from "./components/roomContext.jsx";
import { useRouter } from "next/router";
import Game from "./components/game.jsx";

const Home: React.FC = () => {
  const { createRoom } = useRoom();
  const router = useRouter();

  const handleCreateRoom = () => {
    const roomId = createRoom();
    router.push(`/room/${roomId}`);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <Button position={"absolute"} top={"50%"} onClick={handleCreateRoom}>
        Create lobby
      </Button>
    </main>
  );
};

export default Home;
