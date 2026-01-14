export function splitTextToWords(text: string) {
  const words = text.split(" ");
  let index = 0;

  return words.map((word) => {
    const startIndex = index;
    index += word.length + 1; // + space
    return { word, startIndex };
  });
}
