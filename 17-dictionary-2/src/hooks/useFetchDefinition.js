import { useState, useEffect, useRef } from "react";
import { capitalizeWord } from "../utils/helpers";

const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const cache = {}; // Cache object to store fetched data
const cacheLimit = 31;

function useFetchDefinition(wordToFetch, isWod = false) {
  const [word, setWord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousWord = useRef(null);

  function manageCacheSize() {
    // Manage cache size by removing the first key when cache limit is reached
    const cacheSize = Object.keys(cache).length;
    if (cacheSize === cacheLimit) {
      const keys = Object.keys(cache);
      const firstKey = keys[0];
      delete cache[firstKey];
    }
  }

  function updateLocalStorage(wordToFetch) {
    // Retrieve the existing search history from local storage
    const storedHistory =
      JSON.parse(localStorage.getItem("previousSearches")) || [];
    // Check if the word is already present in the history
    if (!storedHistory.includes(wordToFetch.toLowerCase())) {
      // Add the new word to the history
      const updatedHistory = [wordToFetch.toLowerCase(), ...storedHistory];
      // Save the updated history to local storage
      localStorage.setItem("previousSearches", JSON.stringify(updatedHistory));
      // Dispatch a storage event for synchronization across tabs
      window.dispatchEvent(new Event("storage"));
    }
  }

  useEffect(() => {
    setError(null);

    // Return early if wordToFetch is not valid or is the same as the previous word
    if (
      !wordToFetch ||
      wordToFetch.toLowerCase() === previousWord.current?.toLowerCase()
    )
      return;

    // Update document title with the capitalized word
    if (wordToFetch) {
      document.title = `Word Lookup: ${capitalizeWord(wordToFetch)}`;
    }

    async function fetchDefinition() {
      try {
        setIsLoading(true);
        setError(null);

        // Check if the word is already in the cache
        if (cache[wordToFetch.toLowerCase()]) {
          setWord(cache[wordToFetch.toLowerCase()]);
        } else {
          // Fetch definition from the API
          const res = await fetch(`${BASE_URL}${wordToFetch.toLowerCase()}`);
          if (!res.ok) throw new Error("Failed fetching definition.");

          const [data] = await res.json();
          console.log(data);

          setWord(data);

          // Store the fetched data in the cache
          cache[wordToFetch.toLowerCase()] = data;
        }

        previousWord.current = wordToFetch; // Update previousWord to the current word

        // Manage local storage to ensure only successful fetches are saved in the search history
        if (!isWod) {
          updateLocalStorage(wordToFetch);
        }
      } catch (err) {
        console.error(err.message);
        setError(err.message); // Set error state if fetch fails
      } finally {
        setIsLoading(false);
        manageCacheSize(); // Enforce the cache limit
      }
    }

    fetchDefinition();
  }, [wordToFetch, isWod]);

  return { word, isLoading, error };
}

export default useFetchDefinition;
