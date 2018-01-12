const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const IMAGES = [
  `
   ____
  |    |
  |
  |
  |
  |
 _|_
|   |______
|          |
|__________|
  `,
  `
   ____
  |    |
  |    o
  |
  |
  |
 _|_
|   |______
|          |
|__________|
  `,
  `
   ____
  |    |
  |    o
  |    |
  |
  |
 _|_
|   |______
|          |
|__________|
  `,
  `
   ____
  |    |
  |    o
  |   /|
  |
  |
 _|_
|   |______
|          |
|__________|
  `,
  `
   ____
  |    |
  |    o
  |   /|\\
  |
  |
 _|_
|   |______
|          |
|__________|
  `,
  `
   ____
  |    |
  |    o
  |   /|\\
  |   /
  |
 _|_
|   |______
|          |
|__________|
  `,
  `
   ____
  |    |
  |    o
  |   /|\\
  |   / \\
  |
 _|_
|   |______
|          |
|__________|
  `,
];

const getRamdomWord = () => {
  const words = ['casa', 'cama', 'lavadora'];

  return words[Math.floor(Math.random() * words.length)];
};

const hideWord = (word, letters = []) => {
  const rex = new RegExp('[^' + letters.join('') + '.]', 'g');

  return word.replace(rex, '_');
};

const displayBoard = (word, hiddenWord, tries, used) => {
  console.log('\x1Bc');

  console.log(IMAGES[tries]);
  console.log('\n');
  console.log('Palabra oculta:', hiddenWord);
  console.log('\n');
  console.log('Letras usadas:', used.join(' '));

  rl.question('Ingrese una letra: ', answer => {
    const firstLetter = answer[0];
    const wordContainAnswer = word.indexOf(firstLetter) !== -1 ? true : false;
    const isRepeated = used.includes(firstLetter);
    const answers = isRepeated ? used : [...used, firstLetter];
    const newHidden = hideWord(word, answers);
    const newTries = wordContainAnswer ? tries : tries + 1;
    const lost = tries + 1 === IMAGES.length;
    const won = !newHidden.includes('_');

    if (lost) {
      console.log('\n');
      console.log(`La palabra es ${word}, Perdiste!`);
      process.exit(0);
    }

    if (won) {
      console.log('\n');
      console.log(`La palabra es ${word}, Ganaste!`);
      process.exit(0);
    }

    displayBoard(word, newHidden, newTries, answers);
  });
};

const game = () => {
  const word = getRamdomWord();
  const hiddenWord = hideWord(word);

  displayBoard(word, hiddenWord, 0, []);
};

game();
