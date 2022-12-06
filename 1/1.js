const fs = require("node:fs");

const input = fs.readFileSync("input.txt").toString();
const nbOfWinners = 3;

const solve = input => {
  let inventory = [];
  let index = 0;

  for (const line of input.split("\n")) {
    if (line.length > 0) {
      inventory[index] = (inventory[index] || 0) + parseInt(line);
    }
    else {
      index++;
    }
  }

  return inventory.sort((a, b) => (b - a)).slice(0, nbOfWinners).reduce((a, b) => a + b, 0);
};

console.log(solve(input));