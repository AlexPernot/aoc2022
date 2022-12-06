const fs = require("node:fs");

const input = fs.readFileSync("input.txt");
const sizeOfMarker = 14;

const isMarker = buffer => {
  let foundCharacters = [];

  for (const char of buffer) {
    if (foundCharacters.includes(char)) {
      return false;
    }

    foundCharacters.push(char);
  }

  return true;
}

const solve = input => {
  let buf = [];
  let charIndex = 0;

  for (const char of input) {
    buf.push(char);
    charIndex++;

    if (buf.length > sizeOfMarker) {
      buf.shift();
    }

    if (buf.length === sizeOfMarker && isMarker(buf)) {
      return charIndex;
    }
  }
};

console.log(solve(input));