"use client";
import { Box, Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

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

const Dane = () => {
  const [data, setData] = useState<ApiResponse | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://rickandmortyapi.com/api/character?page=${currentPage}&perPage=16`;

        if (searchTerm) {
          url += `&name=${searchTerm}`;
        }

        const res = await fetch(url);
        const json = await res.json();

        // Ensure we have exactly 16 characters per page
        const results = json?.results.slice(0, 16);
        setData({ ...json, results });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm]);

  const nextPage = () => {
    if (data?.info.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (data?.info.prev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div>
      <div
        style={{ textAlign: "center", marginBottom: "20px", marginTop: "22px" }}
      >
        <Input
          placeholder="Lookup character..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
            key={character.id}
            name={character.name}
            avatarSrc={character.image}
            gender={character.gender}
            location={character.origin.name}
            characterUrl={`rickandmorty1/character/${character.id}`}
          ></Boxx>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button onClick={prevPage} disabled={!data?.info.prev}>
          Previous Page
        </Button>
        <Button onClick={nextPage} disabled={!data?.info.next}>
          Next Page
        </Button>
      </div>
      <p style={{ textAlign: "center" }}>
        Page {currentPage} of {data?.info.pages}
      </p>
    </div>
  );
};

function Boxx(props: {
  name: string;
  children?: ReactNode;
  avatarSrc?: string;
  gender?: string;
  location?: string;
  characterUrl?: string;
}) {
  return (
    <a href={props.characterUrl}>
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
      <a href="https://rock-paper-scissors-client-six.vercel.app/">
        <Button
          left={5}
          position={"absolute"}
          background={"gray.200"}
          color={"black"}
        >
          Go back
        </Button>
      </a>
      <br></br>
      <Dane />
    </main>
  );
}

/*export default function Info() {
  const router = useRouter();
  return <p>Post: {router.query.info}</p>;
}*/
