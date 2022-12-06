const fs = require("node:fs");

const input = fs.readFileSync("input.txt").toString();

const alphabetRange = (start, end) => new Array(end.charCodeAt(0) - start.charCodeAt(0) + 1).fill(0).map((d, i) => String.fromCharCode(i + start.charCodeAt(0)));

const lowercaseAlphabet = alphabetRange("a", "z");
const uppercaseAlphabet = alphabetRange("A", "Z");

let priority = {};

for (let i = 0 ; i < lowercaseAlphabet.length ; i++) {
  priority[lowercaseAlphabet[i]] = i+1;
}
for (let i = 0 ; i < uppercaseAlphabet.length ; i++) {
  priority[uppercaseAlphabet[i]] = i+27;
}

const solvePartOne = input => {
  let totalScore = 0;

  for (const line of input.split("\n")) {
    const firstCompartment = line.slice(0, line.length/2).split("");
    const secondCompartment = line.slice(line.length/2).split("");

    for (const char of firstCompartment) {
      if (secondCompartment.includes(char)) {
        totalScore += priority[char];
        break;
      }
    }
  }

  return totalScore;
};

const solvePartTwo = input => {
  let totalScore = 0;
  const lines = input.split("\n");

  for (let i = 0 ; i < lines.length ; i += 3) {
    for (const char of lines[i]) {
      if (lines[i+1].includes(char) && lines[i+2].includes(char)) {
        totalScore += priority[char];
        break;
      }
    }
  }

  return totalScore;
};

console.log(solvePartTwo(input));