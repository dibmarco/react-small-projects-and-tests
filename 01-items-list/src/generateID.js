function generateID() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "1234567890";
    const specials = "!@$%&";
  
    function generateRandomLetters() {
      const special = specials.split("");
      const randomSpecialIndex = Math.floor(Math.random() * specials.length);
      const randomSpecial = special[randomSpecialIndex];
      const randomLetters = [];
  
      for (let i = 0; i < 3; i++) {
        const letter = letters.split("");
        const randomLetterIndex = Math.floor(Math.random() * letters.length);
        const randomLetter = letter[randomLetterIndex];
        randomLetters.push(randomLetter);
      }
  
      const randomIndex = Math.floor(Math.random() * randomLetters.length);
      const randomLettersWithSpecialCharacter = randomLetters
        .join("")
        .replace(randomLetters[randomIndex], randomSpecial);
  
      return randomLettersWithSpecialCharacter;
    }
  
    function generateRandomNos() {
      const special = specials.split("");
      const randomSpecialIndex = Math.floor(Math.random() * specials.length);
      const randomSpecial = special[randomSpecialIndex];
      const randomNumbers = [];
  
      for (let i = 0; i < 3; i++) {
        const number = numbers.split("");
        const randomNumberIndex = Math.floor(Math.random() * numbers.length);
        const randomNumber = number[randomNumberIndex];
        randomNumbers.push(randomNumber);
      }
  
      const randomIndex = Math.floor(Math.random() * randomNumbers.length);
      const randomNosWithSpecialCharacter = randomNumbers
        .join("")
        .replace(randomNumbers[randomIndex], randomSpecial);
        
      return randomNosWithSpecialCharacter;
    }
  
    const randomLsWithSpecial = generateRandomLetters();
    const randomNosWithSpecial = generateRandomNos();
  
    return `${randomLsWithSpecial}-${randomNosWithSpecial}`;
  }

  export default generateID;