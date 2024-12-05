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
