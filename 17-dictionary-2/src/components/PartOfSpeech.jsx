import React from "react";
import useQuery from "../hooks/useQuery";
import Definitions from "./Definitions";
import Synonyms from "./Synonyms";
import Antonyms from "./Antonyms";

export function PartOfSpeech({ meaning }) {
  const { navigateToWord } = useQuery();

  return (
    <>
      <div key={meaning.partOfSpeech}>
        <h2 className="font-bold capitalize mt-2">{meaning.partOfSpeech}</h2>
        <Definitions definitions={meaning.definitions} />
      </div>
      <div>
        <Synonyms synonyms={meaning.synonyms} />
        <Antonyms antonyms={meaning.antonyms} />
      </div>
    </>
  );
}
