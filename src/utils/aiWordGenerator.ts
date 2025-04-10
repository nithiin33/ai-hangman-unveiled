import { Difficulty } from "@/components/DifficultySelector";

// Dictionary of words by difficulty
const wordsByDifficulty = {
  easy: [
    { word: "CAT", definition: "A small domesticated carnivorous mammal with soft fur, a short snout, and retractable claws." },
    { word: "DOG", definition: "A domesticated carnivorous mammal that typically has a long snout, acute hearing, and is known for its loyalty." },
    { word: "SUN", definition: "The star around which the earth orbits, providing light and heat for the planet." },
    { word: "HAT", definition: "A shaped covering for the head worn for warmth, as a fashion item, or as part of a uniform." },
    { word: "BOOK", definition: "A written or printed work consisting of pages bound together." },
    { word: "FISH", definition: "A limbless cold-blooded vertebrate animal with gills and fins living in water." },
    { word: "BALL", definition: "A solid or hollow spherical object that is used in various games and sports." },
    { word: "TREE", definition: "A woody perennial plant, typically with a single stem or trunk growing to a considerable height." },
    { word: "CAKE", definition: "An item of soft, sweet food made from a mixture of flour, fat, eggs, sugar, and other ingredients, baked." },
    { word: "DOOR", definition: "A hinged, sliding, or revolving barrier at the entrance to a building, room, or vehicle." }
  ],
  medium: [
    { word: "APPLE", definition: "The round fruit of a tree of the rose family, which typically has thin green or red skin and crisp flesh." },
    { word: "HOUSE", definition: "A building for human habitation, especially one that consists of a ground floor and one or more upper storeys." },
    { word: "MUSIC", definition: "Vocal or instrumental sounds combined in such a way as to produce beauty of form, harmony, and expression of emotion." },
    { word: "TABLE", definition: "A piece of furniture with a flat top and one or more legs, providing a level surface for eating, writing, etc." },
    { word: "WATER", definition: "A transparent, odorless, tasteless liquid that forms the seas, lakes, rivers, and rain." },
    { word: "PHONE", definition: "A telecommunications device that converts sound into electrical signals for transmission." },
    { word: "MONEY", definition: "A current medium of exchange in the form of coins and banknotes." },
    { word: "CHAIR", definition: "A separate seat for one person, typically with a back and four legs." },
    { word: "PLANT", definition: "A living organism of the kind exemplified by trees, shrubs, herbs, grasses, ferns, and mosses." },
    { word: "BREAD", definition: "Food made of flour, water, and yeast or another leavening agent, mixed together and baked." }
  ],
  hard: [
    { word: "XYLOPHONE", definition: "A musical instrument played by striking wooden bars of graduated length with small wooden hammers." },
    { word: "SYMPHONY", definition: "An elaborate musical composition for full orchestra, typically in four movements, at least one of which is traditionally in sonata form." },
    { word: "LABYRINTH", definition: "A complicated irregular network of passages or paths in which it is difficult to find one's way." },
    { word: "PNEUMONIA", definition: "Lung inflammation caused by bacterial or viral infection, in which the air sacs fill with pus and may become solid." },
    { word: "QUIZZICAL", definition: "Indicating mild or amused puzzlement; questioning." },
    { word: "AWKWARD", definition: "Causing difficulty; hard to do or deal with; requiring caution; embarrassing; clumsy." },
    { word: "NIGHTFALL", definition: "The onset of darkness; dusk." },
    { word: "BOULEVARD", definition: "A wide street in a town or city, typically one lined with trees." },
    { word: "JAZZ", definition: "A type of music originating in New Orleans characterized by improvisation and syncopation." },
    { word: "VORTEX", definition: "A mass of whirling fluid or air, especially a whirlpool or whirlwind." }
  ]
};

// Function to get a random word based on difficulty
export const getRandomWord = (difficulty: Difficulty) => {
  const wordList = wordsByDifficulty[difficulty];
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
};

// Function to generate a hint for a word
export const generateHint = (word: string, guessedLetters: string[]) => {
  // In a real AI application, this would call an API like OpenAI
  // For now, we'll generate simple hints
  const hints = [
    `This word has ${word.length} letters.`,
    `The first letter is '${word[0]}'.`,
    `The last letter is '${word[word.length - 1]}'.`,
    `This word contains ${countVowels(word)} vowels.`,
    `Think about common objects you use everyday.`,
    `This might be something you can find in nature.`,
    `It might be related to food or drink.`,
    `This could be something you'd find at home.`,
    `Consider words that start with '${word[0]}' and have ${word.length} letters.`
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
  
  // Get a random hint that doesn't reveal unguessed letters
  const randomIndex = Math.floor(Math.random() * safeHints.length);
  return safeHints[randomIndex] || "Try to guess another letter!";
};

// Helper function to count vowels in a word
const countVowels = (word: string) => {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  return word.split('').filter(letter => vowels.includes(letter.toUpperCase())).length;
};

// Generate AI definition for a word (simulated)
export const getWordDefinition = (word: string): string => {
  // In a real application, this would call a dictionary API or AI model
  // For now, we'll return predefined definitions
  for (const difficulty in wordsByDifficulty) {
    const wordList = wordsByDifficulty[difficulty as Difficulty];
    const found = wordList.find(item => item.word.toUpperCase() === word.toUpperCase());
    if (found) {
      return found.definition;
    }
  }
  
  // Default definition if not found
  return `${word} - a word with ${word.length} letters that was challenging to guess!`;
};
