"use client";

import Image from "next/image";
import {
  Box,
  Button,
  ChakraProvider,
  border,
  useFocusEffect,
} from "@chakra-ui/react";
import { serialize } from "v8";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const socket = io("process.env.PORT" || "http://localhost:4000");

const Game = () => {
  const [myChoice, setMyChoice] = useState("");
  const [winLeft, setWinLeft] = useState(0);
  const [winRight, setWinRight] = useState(0);
  const [equal, setEqual] = useState(0);
  const [round, setRound] = useState(1);
  const [opponentsChoice, setOpponentsChoice] = useState("");
  const [myChoiceShow, setMyChoiceShow] = useState("");
  const [opponentsChoiceShow, setOpponentsChoiceShow] = useState("");

  const choices = ["Rock", "Paper", "Scissors"];

  const userChoice = (choice: string) => {
    setMyChoice(choice);
    setMyChoiceShow(choice);
    socket.emit("userChoice", { choice });
  };

  useEffect(() => {
    socket.on("opponentsChoice", ({ choice }) => {
      setOpponentsChoice(choice);
    });

    return () => {
      socket.off("opponentsChoice");
    };
  }, []);

  useEffect(() => {
    if (myChoice && opponentsChoice) {
      setOpponentsChoiceShow(opponentsChoice);
      setRound(round + 1);

      if (myChoice === opponentsChoice) {
        setEqual(equal + 1);
      } else if (
        (myChoice === "Rock" && opponentsChoice === "Scissors") ||
        (myChoice === "Paper" && opponentsChoice === "Rock") ||
        (myChoice === "Scissors" && opponentsChoice === "Paper")
      ) {
        setWinLeft(winLeft + 1);
      } else {
        setWinRight(winRight + 1);
      }
      setMyChoice("");
      setOpponentsChoice("");
    }
  }, [myChoice, opponentsChoice, round, equal, winLeft, winRight]);

  return (
    <ChakraProvider>
      <main
        className="flex min-h-screen flex-col items-center justify-between p-24"
        style={{ backgroundColor: "white" }}
      >
        <a href="http://localhost:3000">
          <Button
            left={5}
            position={"absolute"}
            top={2}
            background={"gray.200"}
            color={"black"}
          >
            Go back
          </Button>
        </a>
        <div style={{ textAlign: "center", position: "absolute", top: "30" }}>
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            border={"1px solid black"}
            width={"80vw"}
            textAlign={"center"}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                border: "1px solid black",
                width: "80vw",
                fontSize: "160%",
              }}
            >
              <ul>
                <li>Win</li>
                <li>{winLeft}</li>
              </ul>
              <ul>
                <li>Equal</li>
                <li>{equal}</li>
              </ul>
              <ul>
                <li>Win</li>
                <li>{winRight}</li>
              </ul>
            </div>
          </Box>
          <h1>Round</h1>
          <h1>{round}</h1>
        </div>
        <div
          className="game"
          style={{
            border: "1px solid black",
            display: "flex",
            justifyItems: "space-around",
            justifyContent: "space-evenly",
            width: "80vw",
          }}
        >
          <h1>Your choice: {myChoiceShow}</h1>
          <h1 id="OC">Opponents choice: {opponentsChoiceShow}</h1>
        </div>
        <div>
          <Button
            borderRadius={"100%"}
            width={"7vw"}
            height={"7vw"}
            onClick={() => userChoice("Rock")}
          >
            Rock
          </Button>
          <Button
            borderRadius={"100%"}
            width={"7vw"}
            height={"7vw"}
            onClick={() => userChoice("Paper")}
          >
            Paper
          </Button>
          <Button
            borderRadius={"100%"}
            width={"7vw"}
            height={"7vw"}
            onClick={() => userChoice("Scissors")}
          >
            Scissors
          </Button>
        </div>
      </main>
    </ChakraProvider>
  );
};

export default function Home() {
  return <Game />;
}
