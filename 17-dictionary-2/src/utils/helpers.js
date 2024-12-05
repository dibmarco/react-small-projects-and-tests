export function getToday() {
  const today = new Date();

  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return formattedDate;
}
