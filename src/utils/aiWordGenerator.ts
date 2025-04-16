// Dictionary of words with their definitions
const wordsList = [
  { word: "XYLOPHONE", definition: "A musical instrument played by striking wooden bars of graduated length with small wooden hammers." },
  { word: "SYMPHONY", definition: "An elaborate musical composition for full orchestra, typically in four movements." },
  { word: "LABYRINTH", definition: "A complicated irregular network of passages or paths in which it is difficult to find one's way." },
  { word: "PNEUMONIA", definition: "Lung inflammation caused by bacterial or viral infection, in which the air sacs fill with pus and may become solid." },
  { word: "QUIZZICAL", definition: "Indicating mild or amused puzzlement; questioning." },
  { word: "AWKWARD", definition: "Causing difficulty; hard to do or deal with; requiring caution; embarrassing; clumsy." },
  { word: "NIGHTFALL", definition: "The onset of darkness; dusk." },
  { word: "BOULEVARD", definition: "A wide street in a town or city, typically one lined with trees." },
  { word: "JAZZ", definition: "A type of music originating in New Orleans characterized by improvisation and syncopation." },
  { word: "VORTEX", definition: "A mass of whirling fluid or air, especially a whirlpool or whirlwind." },
  { word: "CAT", definition: "A small domesticated carnivorous mammal with soft fur, a short snout, and retractable claws." },
  { word: "DOG", definition: "A domesticated carnivorous mammal that typically has a long snout, acute hearing, and is known for its loyalty." },
  { word: "APPLE", definition: "The round fruit of a tree of the rose family, which typically has thin green or red skin and crisp flesh." },
  { word: "HOUSE", definition: "A building for human habitation, especially one that consists of a ground floor and one or more upper storeys." },
  { word: "MUSIC", definition: "Vocal or instrumental sounds combined to produce beauty of form, harmony, and expression of emotion." },
  { word: "ZEBRA", definition: "An African wild horse with black-and-white stripes and an erect mane." },
  { word: "GALAXY", definition: "A system of millions or billions of stars, together with gas and dust, held together by gravitational attraction." },
  { word: "PHOENIX", definition: "A unique bird in mythology that cyclically regenerates by rising from its ashes after death." },
  { word: "WHISKEY", definition: "A spirit distilled from malted grain, especially barley or rye." },
  { word: "OXYGEN", definition: "A colorless, odorless reactive gas, the chemical element of atomic number 8." },
  { word: "PUZZLE", definition: "A game, toy, or problem designed to test ingenuity or knowledge." },
  { word: "KAYAK", definition: "A light narrow boat with a covered deck and a cockpit, propelled by a paddle." },
  { word: "ZOMBIE", definition: "A fictional undead being created through the reanimation of a human corpse." },
  { word: "YACHT", definition: "A medium-sized sailing boat equipped for cruising or racing." },
  { word: "WIZARD", definition: "A man who has magical powers, especially in legends and fairy tales." }
];

// Function to get a random word
export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordsList.length);
  return wordsList[randomIndex];
};

// Function to generate a hint for a word
export const generateHint = (word: string, guessedLetters: string[]) => {
  // Generate all possible hints
  const hints = [
    `This word has ${word.length} letters.`,
    `The first letter is '${word[0]}'.`,
    `The last letter is '${word[word.length - 1]}'.`,
    `This word contains ${countVowels(word)} vowels.`,
    `Think about common objects you use everyday.`,
    `This might be something you can find in nature.`,
    `It might be related to food or drink.`,
    `This could be something you'd find at home.`,
    `Consider words that start with '${word[0]}' and have ${word.length} letters.`,
    `There are ${word.split('').filter(char => char === word[0]).length} occurrences of the letter '${word[0]}'`,
    `This word has ${(word.match(/[aeiouAEIOU]/g) || []).length} vowels and ${word.length - (word.match(/[aeiouAEIOU]/g) || []).length} consonants.`,
    `The word ends with '${word.slice(-2)}'.`,
    `The second letter of the word is '${word[1]}'.`,
    `If you arranged this word's letters alphabetically, '${[...word].sort().join('')}' is what you'd get.`,
    `The middle letter(s) of the word ${word.length % 2 === 0 ? 'are' : 'is'} '${word.length % 2 === 0 ? word.slice(word.length/2 - 1, word.length/2 + 1) : word[Math.floor(word.length/2)]}'.`,
    `The word contains ${new Set(word.split('')).size} unique letters.`,
    `This word is used in ${getWordContext(word)}.`,
    `The word has ${word.split('').filter(char => 'aeiouAEIOU'.includes(char)).length > 2 ? 'more' : 'less'} than 3 vowels.`,
    `${word.length > 5 ? 'This is a relatively long word.' : 'This is a relatively short word.'}`,
    `The letters in this word appear in ${isAlphabeticalOrder(word) ? 'mostly alphabetical' : 'mixed'} order.`
  ];

  // Don't reveal letters that haven't been guessed yet
  const safeHints = hints.filter(hint => {
    // If the hint contains a letter that hasn't been guessed, filter it out
    // Except for the first and last letter hints, which we'll keep
    if (hint.includes(`first letter is`) || hint.includes(`last letter is`)) {
      return true;
    }
    
    const lettersInHint = hint.match(/[A-Z]/gi) || [];
    for (const letter of lettersInHint) {
      if (!guessedLetters.includes(letter.toUpperCase()) && word.toUpperCase().includes(letter.toUpperCase())) {
        return false;
      }
    }
    return true;
  });
  
  // Get a random hint that hasn't been used before
  const unusedHints = safeHints.filter(hint => 
    !sessionStorage.getItem(`used_hint_${word}_${hint}`)
  );
  
  // If all hints have been used, clear the used hints for this word
  if (unusedHints.length === 0) {
    Array.from(sessionStorage.keys()).forEach(key => {
      if (key.startsWith(`used_hint_${word}_`)) {
        sessionStorage.removeItem(key);
      }
    });
    return generateHint(word, guessedLetters); // Try again with cleared hints
  }
  
  const randomIndex = Math.floor(Math.random() * unusedHints.length);
  const selectedHint = unusedHints[randomIndex];
  
  // Mark this hint as used
  sessionStorage.setItem(`used_hint_${word}_${selectedHint}`, 'true');
  
  return selectedHint || "Try to guess another letter!";
};

// Helper function to count vowels in a word
const countVowels = (word: string) => {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  return word.split('').filter(letter => vowels.includes(letter.toUpperCase())).length;
};

// Generate AI definition for a word
export const getWordDefinition = (word: string): string => {
  const found = wordsList.find(item => item.word.toUpperCase() === word.toUpperCase());
  return found ? found.definition : `${word} - a word with ${word.length} letters that was challenging to guess!`;
};

// New helper functions for enhanced hints
const getWordContext = (word: string): string => {
  const contexts = ['everyday conversation', 'formal writing', 'scientific context', 'common vocabulary'];
  return contexts[Math.floor(Math.random() * contexts.length)];
};

const isAlphabeticalOrder = (word: string): boolean => {
  const sorted = [...word.toLowerCase()].sort().join('');
  return word.toLowerCase().split('').filter((char, i) => char === sorted[i]).length > word.length / 2;
};
