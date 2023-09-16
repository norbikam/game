import { color } from "framer-motion";
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

const CharacterDetail = ({ character }: CharacterDetailProps) => {
  return (
    <div style={{ color: "black" }}>
      <h1>{character.name}</h1>
      {/* ... (other character details) */}
      <Link href="/characters">Back to Characters</Link>
    </div>
  );
};

export default CharacterDetail;
