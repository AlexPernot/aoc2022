const fs = require("node:fs");

const exampleInput = "2-4,6-8\n" +
  "2-3,4-5\n" +
  "5-7,7-9\n" +
  "2-8,3-7\n" +
  "6-6,4-6\n" +
  "2-6,4-8";
const exampleLines = exampleInput.split("\n").filter(s => s.length > 0);

const input = fs.readFileSync("input.txt").toString();
const lines = input.split("\n").filter(s => s.length > 0);

const regex = /\d+/g;

const groupsContain = (g1Start, g1End, g2Start, g2End) => (g1Start >= g2Start && g1End <= g2End) || (g2Start >= g1Start && g2End <= g1End);
const groupsOverlap = (g1Start, g1End, g2Start, g2End) => {
  for (let i = g1Start ; i <= g1End ; i++) {
    if (i >= g2Start && i <= g2End) {
      return true;
    }
  }

  return false;
}

const solvePartOne = lines => {
  let totalScore = 0;

  for (const line of lines) {
    const captured = line.match(regex).map(s => parseInt(s));
    if (groupsContain(...captured)) {
      totalScore++;
    }
  }

  return totalScore;
};

const solvePartTwo = lines => {
  let totalScore = 0;

  for (const line of lines) {
    const captured = line.match(regex).map(s => parseInt(s));
    if (groupsOverlap(...captured)) {
      totalScore++;
    }
  }

  return totalScore;
};

console.log(solvePartTwo(lines));