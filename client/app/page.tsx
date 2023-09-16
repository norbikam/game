"use client";

import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const xd = { xd1: 2 };
  const { xd1 } = xd;
  const funkcja = (xd1: number) => {
    console.log(xd1);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box
        height={"max-content"}
        width={50}
        border={"1px solid black"}
        borderRadius={20}
        textAlign={"center"}
        color={"black"}
      >
        {count}
      </Box>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Clicker
      </Button>
      <Box display={"flex"} justifyContent={"center"}>
        <a href="/rickandmorty">
          <Button>Rick And Morty API</Button>
        </a>
        <a href="/rockpaperscissors">
          <Button>Rock Paper Scissors</Button>
        </a>
        <br></br>
        <a href="/rps">
          <Button>Rock Paper Scissors Exclusive Rooms</Button>
        </a>
      </Box>
    </main>
  );
}
