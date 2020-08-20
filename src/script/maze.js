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

export const recursiveBackTrack = (numCol, numRow, startCoord) => {
  let unvisitArray = [];
  // Create a dict to hold all coord
  let grid = {};
  for (let i = 0; i < numRow; i++) {
    for (let j = 0; j < numCol; j++) {
      grid[`${i},${j}`] = { state: "wall" };
    }
  }
  let stack = [startCoord];
  while (stack.length !== 0) {
    let currentCell = stack.pop();
    let validNeighbours = findNeighbouringNodes(
      currentCell,
      grid,
      numRow,
      numCol
    );
    while (validNeighbours.length !== 0) {
      // Choose a random next cell to visit from valid Neighbours
      let nextCellToVisit =
        validNeighbours[Math.floor(validNeighbours.length * Math.random())];
      // Open a path between the currentCell and the nextCellToVisit
      [
        currentCell,
        cellBetween(currentCell, nextCellToVisit),
        nextCellToVisit,
      ].forEach((cell) => {
        grid[cell].state = "unvisited";
        unvisitArray.push(cell);
      });
      // Add nextCellToVisit to stack
      stack.push(nextCellToVisit);

      // Set nextCellToVisit as the currentCell
      currentCell = nextCellToVisit;

      // Re-evaluate valid neighbours
      validNeighbours = findNeighbouringNodes(
        currentCell,
        grid,
        numRow,
        numCol
      );
    }
  }

  return unvisitArray;
};

const findNeighbouringNodes = (currentCell, grid, numRow, numCol) => {
  let currentRow = parseInt(currentCell.split(",")[0]);
  let currentCol = parseInt(currentCell.split(",")[1]);
  let validNeighbours = [];
  // Check Top Cell
  if (currentRow - 2 >= 0) {
    if (grid[`${currentRow - 2},${currentCol}`].state === "wall") {
      validNeighbours.push(`${currentRow - 2},${currentCol}`);
    }
  }
  // Check Bottom Cell
  if (currentRow + 2 < numRow) {
    if (grid[`${currentRow + 2},${currentCol}`].state === "wall") {
      validNeighbours.push(`${currentRow + 2},${currentCol}`);
    }
  }
  // Check Left Cell
  if (currentCol - 2 >= 0) {
    if (grid[`${currentRow},${currentCol - 2}`].state === "wall") {
      validNeighbours.push(`${currentRow},${currentCol - 2}`);
    }
  }
  // Check Right Cell
  if (currentCol + 2 < numCol) {
    if (grid[`${currentRow},${currentCol + 2}`].state === "wall") {
      validNeighbours.push(`${currentRow},${currentCol + 2}`);
    }
  }
  return validNeighbours;
};

const cellBetween = (coord1, coord2) => {
  let row1 = parseInt(coord1.split(",")[0]);
  let col1 = parseInt(coord1.split(",")[1]);
  let row2 = parseInt(coord2.split(",")[0]);
  let col2 = parseInt(coord2.split(",")[1]);

  if (row1 === row2) {
    return `${row1},${(col1 + col2) / 2}`;
  } else {
    return `${(row1 + row2) / 2},${col1}`;
  }
};
