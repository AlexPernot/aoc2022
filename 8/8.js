const fs = require("node:fs");

const exampleInput = "30373\n" +
  "25512\n" +
  "65332\n" +
  "33549\n" +
  "35390";
const exampleLines = exampleInput.split("\n");

const input = fs.readFileSync("input.txt").toString();
const lines = input.split("\n");

const isVisibleFromDirection = (grid, valueRowIndex, valueColIndex, direction) => {
  const value = grid[valueRowIndex][valueColIndex];

  switch (direction) {
    case "top":
      for (let i = valueRowIndex - 1; i >= 0; i--) {
        if (value <= grid[i][valueColIndex]) {
          return false;
        }
      }
      break;
    case "bottom":
      for (let i = valueRowIndex + 1; i < grid.length; i++) {
        if (value <= grid[i][valueColIndex]) {
          return false;
        }
      }
      break;
    case "left":
      for (let j = valueColIndex - 1; j >= 0; j--) {
        if (value <= grid[valueRowIndex][j]) {
          return false;
        }
      }
      break;
    case "right":
      for (let j = valueColIndex + 1; j < grid[valueRowIndex].length; j++) {
        if (value <= grid[valueRowIndex][j]) {
          return false;
        }
      }
      break;
  }

  //console.log(`${value} (${valueRowIndex},${valueColIndex}) is visible from the ${direction}`)
  return true;
};

const isVisible = (grid, valueRowIndex, valueColIndex) =>
  isVisibleFromDirection(grid, valueRowIndex, valueColIndex, "top")
  || isVisibleFromDirection(grid, valueRowIndex, valueColIndex, "bottom")
  || isVisibleFromDirection(grid, valueRowIndex, valueColIndex, "left")
  || isVisibleFromDirection(grid, valueRowIndex, valueColIndex, "right")

const getNumberOfVisibleTreesInDirection = (grid, valueRowIndex, valueColIndex, direction) => {
  const value = grid[valueRowIndex][valueColIndex];
  let count = 1;

  switch (direction) {
    case "top":
      for (let i = valueRowIndex - 1; i >= 0; i--, count++) {
        if (value <= grid[i][valueColIndex]) {
          return count;
        }
      }
      return count - 1;
    case "bottom":
      for (let i = valueRowIndex + 1; i < grid.length; i++, count++) {
        if (value <= grid[i][valueColIndex]) {
          return count;
        }
      }
      return count - 1;
    case "left":
      for (let j = valueColIndex - 1; j >= 0; j--, count++) {
        if (value <= grid[valueRowIndex][j]) {
          return count;
        }
      }
      return count - 1;
    case "right":
      for (let j = valueColIndex + 1; j < grid[valueRowIndex].length; j++, count++) {
        if (value <= grid[valueRowIndex][j]) {
          return count;
        }
      }
      return count - 1;
  }

  //console.log(`${value} (${valueRowIndex},${valueColIndex}) is visible from the ${direction}`)
};

const getScenicScore = (grid, valueRowIndex, valueColIndex) => getNumberOfVisibleTreesInDirection(grid, valueRowIndex, valueColIndex, "top")
  * getNumberOfVisibleTreesInDirection(grid, valueRowIndex, valueColIndex, "bottom")
  * getNumberOfVisibleTreesInDirection(grid, valueRowIndex, valueColIndex, "left")
  * getNumberOfVisibleTreesInDirection(grid, valueRowIndex, valueColIndex, "right")


const solvePartOne = lines => {
  const grid = [];
  const visibleTrees = [];

  for (const line of lines) {
    let row = [];
    for (const num of line) {
      row.push(parseInt(num));
    }
    grid.push(row);
  }

  // Inner trees
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (isVisible(grid, i, j)) {
        visibleTrees.push(grid[i][j]);
      }
    }
  }

  const outerTreesNumber = 2 * grid.length + 2 * grid[0].length - 4

  return visibleTrees.length + (outerTreesNumber);
};

const solvePartTwo = lines => {
  const grid = [];
  let maxScenicScore = 0;

  for (const line of lines) {
    let row = [];
    for (const num of line) {
      row.push(parseInt(num));
    }
    grid.push(row);
  }

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      /*if (getScenicScore(grid, i, j) > maxScenicScore) {
        console.log(`${grid[i][j]} (${i},${j}) is a new max with ${getScenicScore(grid, i, j)}`)
      }*/
      maxScenicScore = Math.max(maxScenicScore, getScenicScore(grid, i, j));
    }
  }

  return maxScenicScore;
};

console.log(solvePartTwo(lines));

