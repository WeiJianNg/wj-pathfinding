import { calculateDistance } from "./pathfinding";
export const recursiveDivision = (
  numCol,
  numRow,
  startCoord,
  endCoord,
  skew = null
) => {
  let wallArray = [];
  // Function to generate maze using recursive function
  // Fill corner
  fillCorner(numCol, numRow, wallArray);
  recursiveDivisionHelper(
    numCol,
    numRow,
    1,
    1,
    numRow - 2,
    numCol - 2,
    startCoord,
    endCoord,
    chooseOrientation(numRow, numCol, skew),
    skew,
    wallArray
  );

  let midpoint = `${Math.floor(numRow / 2)},${Math.floor(numCol / 2)}`;

  wallArray.sort((a, b) => {
    return calculateDistance(a, midpoint) - calculateDistance(b, midpoint);
  });

  return wallArray;
};

const recursiveDivisionHelper = (
  numCol,
  numRow,
  startRow,
  startCol,
  endRow,
  endCol,
  startCoord,
  endCoord,
  orientation,
  skew,
  wallArray
) => {
  // Base case - min distance between rows and cols = 1
  if (endCol - startCol < 1 || endRow - startRow < 1) {
    return;
  }
  // Check if Horizontal
  let isHorizontal = orientation === "horizontal";

  if (isHorizontal) {
    let possibleRows = [];
    let possiblePassage = [];
    for (let i = startRow; i <= endRow && i !== numRow - 2; i++) {
      if (i % 2 === 0) {
        possibleRows.push(i);
      }
    }
    // Return When grid is too small
    if (possibleRows.length === 0) {
      return;
    }

    for (let i = startCol; i <= endCol; i++) {
      if (i % 2 !== 0) {
        possiblePassage.push(i);
      }
    }
    let newRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];
    let passage =
      possiblePassage[Math.floor(Math.random() * possiblePassage.length)];

    // Draw wall
    for (let j = startCol; j <= endCol; j++) {
      if (
        j !== passage &&
        `${newRow},${j}` !== startCoord &&
        `${newRow},${j}` !== endCoord
      ) {
        wallArray.push(`${newRow},${j}`);
      }
    }

    // Call recursive division on two newly generated area (Upper Area)
    recursiveDivisionHelper(
      numCol,
      numRow,
      startRow,
      startCol,
      newRow - 1,
      endCol,
      startCoord,
      endCoord,
      chooseOrientation(newRow - 1 - startRow, endCol - startCol, skew),
      skew,
      wallArray
    );

    // Call recursive division on two newly generated area (Lower Area)
    recursiveDivisionHelper(
      numCol,
      numRow,
      newRow + 1,
      startCol,
      endRow,
      endCol,
      startCoord,
      endCoord,
      chooseOrientation(endRow - (newRow + 1), endCol - startCol, skew),
      skew,
      wallArray
    );
  } else {
    let possibleColumns = [];
    let possiblePassage = [];
    for (let i = startCol; i <= endCol && i !== numCol - 2; i++) {
      if (i % 2 === 0) {
        possibleColumns.push(i);
      }
    }
    if (possibleColumns.length === 0) {
      return;
    }
    for (let i = startRow; i <= endRow; i++) {
      if (i % 2 !== 0) {
        possiblePassage.push(i);
      }
    }
    let newColumn =
      possibleColumns[Math.floor(Math.random() * possibleColumns.length)];
    let passage =
      possiblePassage[Math.floor(Math.random() * possiblePassage.length)];

    // Draw wall
    for (let j = startRow; j <= endRow; j++) {
      if (
        j !== passage &&
        `${j},${newColumn}` !== startCoord &&
        `${j},${newColumn}` !== endCoord
      ) {
        wallArray.push(`${j},${newColumn}`);
      }
    }
    // Call recursive division on two newly generated area (Left Area)
    recursiveDivisionHelper(
      numCol,
      numRow,
      startRow,
      startCol,
      endRow,
      newColumn - 1,
      startCoord,
      endCoord,
      chooseOrientation(endRow - startRow, newColumn - 1 - startCol, skew),
      skew,
      wallArray
    );

    // Call recursive division on two newly generated area (Right Area)
    recursiveDivisionHelper(
      numCol,
      numRow,
      startRow,
      newColumn + 1,
      endRow,
      endCol,
      startCoord,
      endCoord,
      chooseOrientation(endRow - startRow, endCol - (newColumn + 1), skew),
      skew,
      wallArray
    );
  }
};

const fillCorner = (numCol, numRow, wallArray) => {
  // Fill in Left and Right Edges
  for (let i = 0; i < numRow; i++) {
    wallArray.push(`${i},0`);
    wallArray.push(`${i},${numCol - 1}`);
  }
  // Fill in Top and Bottom Edges
  for (let j = 0; j < numCol; j++) {
    wallArray.push(`0,${j}`);
    wallArray.push(`${numRow - 1},${j}`);
  }
};

const chooseOrientation = (numRow, numCol, skew = null) => {
  let orientation = ["horizontal", "vertical"];
  if (skew === null) {
    if (numRow > numCol) {
      return orientation[0];
    } else {
      return orientation[1];
    }
  }
  if (skew === "vertical") {
    let random = Math.random();
    if (random < 0.7) {
      return orientation[1];
    } else {
      return orientation[0];
    }
  }
  if (skew === "horizontal") {
    let random = Math.random();
    if (random < 0.8) {
      return orientation[0];
    } else {
      return orientation[1];
    }
  }
};
