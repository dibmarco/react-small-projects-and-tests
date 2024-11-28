import { useState, useEffect, useRef } from "react";

function useFetchDefinition(wordToFetch) {
  const [word, setWord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousWord = useRef(null);

  const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  useEffect(() => {
    // Check if the wordToFetch is different from the previous word in a case-insensitive manner
    if (wordToFetch.toLowerCase() !== previousWord.current?.toLowerCase()) {
      async function fetchDefinition() {
        try {
          setIsLoading(true);
          setError("");

          // Fetch the word definition using the API
          const res = await fetch(`${BASE_URL}${wordToFetch.toLowerCase()}`);

          if (!res.ok) throw new Error("Failed fetching definition.");

          const [data] = await res.json();
          console.log(data);

          // Update the state with the fetched data
          setWord(data);

          // Update the previous word reference
          previousWord.current = wordToFetch;
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
