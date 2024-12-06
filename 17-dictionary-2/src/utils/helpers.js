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

  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return formattedDate;
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
