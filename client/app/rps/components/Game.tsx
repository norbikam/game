// components/Game.tsx
import React, { useState, useEffect } from "react";
import { Button, ChakraProvider, Box } from "@chakra-ui/react";
import { io, Socket } from "socket.io-client";

const socket = io("https://rock-paper-scissors-axnz.onrender.com");

const Game = () => {
  const [myChoice, setMyChoice] = useState("");
  const [winLeft, setWinLeft] = useState(0);
  const [winRight, setWinRight] = useState(0);
  const [equal, setEqual] = useState(0);
  const [round, setRound] = useState(1);
  const [opponentsChoice, setOpponentsChoice] = useState("");
  const [myChoiceShow, setMyChoiceShow] = useState("");
  const [opponentsChoiceShow, setOpponentsChoiceShow] = useState("");
  const [gameInfo, setGameInfo] = useState("");

  const choices = ["Rock", "Paper", "Scissors"];

  const userChoice = (choice: string) => {
    // Your user choice logic
  };

  useEffect(() => {
    // Socket event listeners for opponents choice
    socket.on("opponentsChoice", ({ choice }) => {
      // Handle opponent's choice logic here
    });

    return () => {
      // Clean up socket event listeners on component unmount
      socket.off("opponentsChoice");
    };
  }, []); // Empty dependency array means this useEffect runs once when component mounts

  useEffect(() => {
    // Game logic for calculating winner, updating scores, etc.
  }, [myChoice, opponentsChoice, round, equal, winLeft, winRight]);

  return <ChakraProvider>{/* Your JSX for the game UI */}</ChakraProvider>;
};

export default Game;
