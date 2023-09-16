import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { RickData } from "../../page";
import Link from "next/link";

interface CharacterDetailProps {
  character: {
    name: string;
    gender: string;
    origin: {
      name: string;
    };
  };
}

function CharacterDetails(props: {
  name: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: string;
  location?: string;
  characterImage?: string;
}) {
  return (
    <main className="flex flex-col items-center justify-between p-5">
      <Box width={"50%"} color={"black"}>
        <Box display={"flex"}>
          <Box>
            <h1 style={{ fontSize: 70, padding: 5 }}>{props.name}</h1>
            <p>Specie: {props.species}</p>
            <p>Gender: {props.gender}</p>
            <p>Status: {props.status}</p>
            <p>Origin: {props.origin}</p>
            <p>Location: {props.location}</p>
          </Box>
          <Box>
            <img
              src={props.characterImage}
              alt=""
              style={{ borderRadius: 20 }}
            />
          </Box>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          paddingTop={5}
        >
          <Link href={"/rickandmorty"}>
            <Button
              border={"2px solid black"}
              fontSize={"150%"}
              color={"black"}
            >
              Go Back
            </Button>
          </Link>
        </Box>
      </Box>
    </main>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const character = (await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  ).then((res) => res.json())) as RickData;
  return (
    <div>
      <CharacterDetails
        name={character.name}
        status={character.status}
        species={character.species}
        gender={character.gender}
        origin={character.origin.name}
        location={character.location.name}
        characterImage={character.image}
      />
      {params.id}
    </div>
  );
}

const CharacterDetail = async ({ character }: CharacterDetailProps) => {
  const router = useRouter();

  return (
    <div>
      <h1>{character.name}</h1>
      <p>Gender: {character.gender}</p>
      <p>Location: {character.origin.name}</p>
      {/* Add more details as needed */}
    </div>
  );
};
