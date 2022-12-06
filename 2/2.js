const fs = require("node:fs");

const input = fs.readFileSync("input.txt").toString();

const moveScore = {
  "X": 1,
  "Y": 2,
  "Z": 3
};

const playScore = {
  "X": 0,
  "Y": 3,
  "Z": 6
}

const getMyPlayScore = (opponentPlay, myPlay) => {
  switch (opponentPlay) {
    // Rock
    case "A":
      if (myPlay === "X") return 3;
      if (myPlay === "Y") return 6;
      if (myPlay === "Z") return 0;
      break;
    // Paper
    case "B":
      if (myPlay === "X") return 0;
      if (myPlay === "Y") return 3;
      if (myPlay === "Z") return 6;
      break;
    // Scissors
    case "C":
      if (myPlay === "X") return 6;
      if (myPlay === "Y") return 0;
      if (myPlay === "Z") return 3;
      break;
  }
};

const getMyMoveScore = (opponentPlay, myPlay) => {
  switch (opponentPlay) {
    // Rock
    case "A":
      if (myPlay === "X") return 3;
      if (myPlay === "Y") return 1;
      if (myPlay === "Z") return 2;
      break;
    // Paper
    case "B":
      if (myPlay === "X") return 1;
      if (myPlay === "Y") return 2;
      if (myPlay === "Z") return 3;
      break;
    // Scissors
    case "C":
      if (myPlay === "X") return 2;
      if (myPlay === "Y") return 3;
      if (myPlay === "Z") return 1;
      break;
  }
};

const solvePartOne = input => {
  let totalScore = 0;

  for (const line of input.split("\n")) {
    if (line.length === 3) {
      const [opponentPlay, myPlay] = line.split(" ");

      totalScore += getMyPlayScore(opponentPlay, myPlay) + moveScore[myPlay];
    }
  }

  return totalScore;
};

const solvePartTwo = input => {
  let totalScore = 0;

  for (const line of input.split("\n")) {
    if (line.length === 3) {
      const [opponentPlay, myResult] = line.split(" ");

      totalScore += playScore[myResult] + getMyMoveScore(opponentPlay, myResult);
    }
  }

  return totalScore;
};

console.log(solvePartTwo(input));