const fs = require("node:fs");

const exampleInput = "    [D]    \n" +
  "[N] [C]    \n" +
  "[Z] [M] [P]\n" +
  " 1   2   3 \n" +
  "\n" +
  "move 1 from 2 to 1\n" +
  "move 3 from 1 to 3\n" +
  "move 2 from 2 to 1\n" +
  "move 1 from 1 to 2";
const exampleLines = exampleInput.split("\n").filter(s => s.length > 0);

const input = fs.readFileSync("input.txt").toString();
const lines = input.split("\n").filter(s => s.length > 0);

const buildStacks = (lines, endLineIndex) => {
  let stacks = [];
  for (let i = endLineIndex ; i >= 0 ; i--) {
    for (let j = 1, stacksIndex = 0 ; j < lines[i].length ; j += 4, stacksIndex++) {
      if (lines[i][j] !== " ") {
        if (stacks[stacksIndex]) {
          stacks[stacksIndex].push(lines[i][j]);
        }
        else {
          stacks[stacksIndex] = [lines[i][j]]
        }
      }
    }
  }

  return stacks;
}

const executeOrderPartOne = (stacks, orderLine) => {
  const regex = /\d+/g;
  const captured = orderLine.match(regex);

  const moved = stacks[captured[1]-1].splice(-captured[0]);

  for (let i = moved.length-1 ; i >= 0 ; i--) {
    stacks[captured[2]-1].push(moved[i]);
  }
}

const executeOrderPartTwo = (stacks, orderLine) => {
  const regex = /\d+/g;
  const captured = orderLine.match(regex);

  const moved = stacks[captured[1]-1].splice(-captured[0]);

  for (const crate of moved) {
    stacks[captured[2]-1].push(crate);
  }
}

const solvePartOne = lines => {
  let stacks = [];
  let topOfStacks = [];
  let ordersStartLineIndex;

  for (let i = 0 ; i < lines.length ; i++) {
    if (lines[i].startsWith("move")) {
      ordersStartLineIndex = i;
      stacks = buildStacks(lines, i-2);
      break;
    }
  }

  for (let i = ordersStartLineIndex ; i < lines.length ; i++) {
    executeOrderPartOne(stacks, lines[i]);
  }

  for (const stack of stacks) {
    topOfStacks.push(stack[stack.length-1]);
  }

  return topOfStacks;
};

const solvePartTwo = lines => {
  let stacks = [];
  let topOfStacks = [];
  let ordersStartLineIndex;

  for (let i = 0 ; i < lines.length ; i++) {
    if (lines[i].startsWith("move")) {
      ordersStartLineIndex = i;
      stacks = buildStacks(lines, i-2);
      break;
    }
  }

  for (let i = ordersStartLineIndex ; i < lines.length ; i++) {
    executeOrderPartTwo(stacks, lines[i]);
  }

  for (const stack of stacks) {
    topOfStacks.push(stack[stack.length-1]);
  }

  return topOfStacks;
};

console.log(solvePartTwo(lines));