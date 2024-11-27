import { useState, useEffect, useRef } from 'react';

function useFetchDefinition(wordToFetch) {
  const [word, setWord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const previousWord = useRef(null);

  const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  useEffect(() => {
    if (wordToFetch !== previousWord.current) {
      async function fetchDefinition() {
        try {
          setIsLoading(true);

          const res = await fetch(`${BASE_URL}${wordToFetch}`);

          if (!res.ok) throw new Error("Failed fetching definition.");

          const [data] = await res.json();
          console.log(data);

          setWord(data);
          previousWord.current = wordToFetch; // Update the previous word
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchDefinition();
    }
  }, [wordToFetch]);

  return { word, isLoading, error };
}

export default useFetchDefinition;
