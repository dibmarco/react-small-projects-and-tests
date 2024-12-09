import { useState, useEffect, useRef } from "react";
import { capitalizeWord } from "../utils/helpers";

const cache = {};
const cacheLimit = 4;

function useFetchDefinition(wordToFetch, isWod = false) {
  const [word, setWord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousWord = useRef(null);

  const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  useEffect(() => {
    setError(null);

    if (
      !wordToFetch ||
      wordToFetch.toLowerCase() === previousWord.current?.toLowerCase()
    )
      return;

    if (wordToFetch) {
      document.title = `Word Lookup: ${capitalizeWord(wordToFetch)}`;
    }

    async function fetchDefinition() {
      try {
        // Check if the word is already in the cache
        if (cache[wordToFetch.toLowerCase()]) {
          setWord(cache[wordToFetch.toLowerCase()]);
        } else {
          setIsLoading(true);
          setError(null);

          const res = await fetch(`${BASE_URL}${wordToFetch.toLowerCase()}`);
          if (!res.ok) throw new Error("Failed fetching definition.");

          const [data] = await res.json();

          setWord(data);

          // Store the fetched data in the cache
          cache[wordToFetch.toLowerCase()] = data;
        }

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

        const cacheSize = Object.keys(cache).length;
        
        if (cacheSize === cacheLimit) {
          const keys = Object.keys(cache);
          const firstKey = keys[0];
          delete cache[firstKey];
        }
        const cacheSizeUpdated = Object.keys(cache).length;
        console.log(cache, cacheSize, cacheSizeUpdated);
      }
    }

    fetchDefinition();
  }, [wordToFetch, isWod]);

  return { word, isLoading, error };
}

export default useFetchDefinition;
