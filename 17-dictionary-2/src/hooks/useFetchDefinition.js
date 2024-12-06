import { useState, useEffect, useRef } from "react";

function useFetchDefinition(wordToFetch, isWod = false) {
  const [word, setWord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousWord = useRef(null);

  const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  useEffect(() => {
    if (
      !wordToFetch ||
      wordToFetch.toLowerCase() === previousWord.current?.toLowerCase()
    )
      return;

    if (wordToFetch) {
      const capitalizedWord =
        wordToFetch.charAt(0).toUpperCase() + wordToFetch.slice(1);
      document.title = `Word Lookup: ${capitalizedWord}`;
    }

    async function fetchDefinition() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${BASE_URL}${wordToFetch.toLowerCase()}`);
        if (!res.ok) throw new Error("Failed fetching definition.");

        const [data] = await res.json();
        // console.log(data);

        setWord(data);
        previousWord.current = wordToFetch;

        // !!! Manage local storage to ensure only successful fetches are saved in the search history. !!!

        // Exit if this is called from the Word of the Day (WoD) component.
        if (isWod) return;

        // Retrieve the existing search history from local storage.
        const storedHistory =
          JSON.parse(localStorage.getItem("previousSearches")) || [];

        // Check if the word is already present in the history.
        if (!storedHistory.includes(wordToFetch.toLowerCase())) {
          // Add the new word to the history.
          const updatedHistory = [wordToFetch.toLowerCase(), ...storedHistory];
          // Save the updated history to local storage.
          localStorage.setItem(
            "previousSearches",
            JSON.stringify(updatedHistory)
          );
          // Dispatch a storage event for synchronization across tabs.
          window.dispatchEvent(new Event("storage"));
        }
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDefinition();
  }, [wordToFetch, isWod]);

  return { word, isLoading, error };
}

export default useFetchDefinition;
