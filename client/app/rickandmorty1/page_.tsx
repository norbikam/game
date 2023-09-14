"use client";

import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Container,
  IconButton,
  color,
  position,
} from "@chakra-ui/react";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

//-------------------------------------------------------------

export interface ApiResponse {
  info: Info;
  results: RickData[];
}

export interface RickData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Origin;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

//-------------------------------------------------------------

const Dane = () => {
  const [data, setData] = useState<ApiResponse | undefined>();

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const res = await (
        await fetch("https://rickandmortyapi.com/api/character")
      ).json();

      // set state when the data received
      setData(res);
    };

    dataFetch();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {data?.results.map((character) => (
        <Boxx
          name={character.name}
          avatarSrc={character.image}
          gender={character.gender}
          location={character.origin.name}
        ></Boxx>
      ))}
    </div>
  );
};

function Boxx(props: {
  name: string;
  children?: ReactNode;
  avatarSrc?: string;
  gender?: string;
  location?: string;
}) {
  return (
    <a href="#">
      <Box
        borderRadius={20}
        border={"1px solid black"}
        height="max-content"
        width={200}
        padding={2}
        margin={2}
        textAlign="center"
      >
        <h1>{props.name}</h1>
        <br></br>
        <p>{props.gender}</p>
        <br></br>
        {props.location}
        <br></br>
        <br></br>
        <img src={props.avatarSrc} alt="" style={{ borderRadius: 20 }} />
      </Box>
    </a>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-5">
      <a href="http://localhost:3000">
        <Button
          left={5}
          position={"absolute"}
          background={"gray.200"}
          color={"black"}
        >
          Go back
        </Button>
      </a>
      <h1>
        <Input
          placeholder="Lookup character..."
          float={"left"}
          width={Math.ceil(300)}
          borderRightRadius={0}
        />
        <Button
          aria-label="Search database"
          colorScheme="blue"
          placeholder="Search"
          float={"right"}
          borderLeftRadius={0}
        >
          Search
        </Button>
      </h1>
      <br></br>
      <Dane />
    </main>
  );
}
