export const wordList = [
  "serendipity",
  "luminous",
  "euphoria",
  "ephemeral",
  "ineffable",
  "solitude",
  "mellifluous",
  "labyrinthine",
  "eloquent",
  "iridescent",
  "tranquility",
  "resonance",
  "effervescent",
  "aesthetic",
  "nebulous",
  "paradox",
  "luminescence",
  "alchemy",
  "zephyr",
  "reverie",
  "zenith",
  "ubiquitous",
  "wanderlust",
  "ameliorate",
  "rhapsody",
  "resilience",
  "synergy",
  "elation",
  "incandescent",
  "perennial",
];

export function getToday() {
  const today = new Date();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function shareWord(wordToShare) {
  const sharingData = {
    title: "Word Lookup App",
    text: `Word Lookup: ${capitalizeWord(wordToShare)}`,
    // url: `https://word-lookup-md.netlify.app/${wordToFetch}`,
    url: window.location.href, // Dynamically get the current URL
  };

  try {
    await navigator.share(sharingData);
  } catch (err) {
    console.error("Failed sharing word.", err);
  }
}

export function makeWordsClickable(content, navigateToWord) {
  // Regular expression to remove non-alphabetic characters from the beginning and end.
  const cleanWord = (word) => word.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "");

  // Split the content into words and wrap each word in a span.
  const words = content.split(" ");

  const clickableWord = words.map((word, i) => {
    const cleanedWord = cleanWord(word);
    return (
      <span key={i} onDoubleClick={() => navigateToWord(cleanedWord)}>
        {word}{" "}
      </span>
    );
  });

  return clickableWord;
}
