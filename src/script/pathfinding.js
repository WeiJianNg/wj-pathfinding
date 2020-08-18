export const pathFinding = (
  method,
  grid,
  startCoord,
  endCoord,
  numCol,
  numRow
) => {
  let visitTimeline = [];
  // no Heuristic for Djisktra. Node to explore is chosen based on min distance
  if (method === "A* Search") {
    // Add Euclidean Distance to guide which nodes to explore first
    Object.keys(grid).forEach((coord) => {
      grid[coord].weight = calculateDistance(coord, endCoord);
    });
  }
  // Initialisation
  let queue = [];
  grid[startCoord].distance = 0;
  grid[startCoord].path = [startCoord];
  queue.push(startCoord);
  while (queue.length !== 0) {
    // Sort queue array according to distance
    if (method === "A* Search") {
      // Add Euclidean Distance to guide which nodes to explore first
      queue.sort((a, b) => {
        return grid[b].weight - grid[a].weight;
      });
    } else {
      queue.sort((a, b) => {
        return grid[b].distance - grid[a].distance;
      });
    }

    let currentCell = queue.pop();

    // Find neighbouring nodes
    let nearbyUnvisitedNodes = findNearbyNodes(
      currentCell,
      numCol,
      numRow,
      grid
    );

    // Update distance for nearby nodes
    for (let i = 0; i < nearbyUnvisitedNodes.length; i++) {
      if (
        grid[currentCell].distance + 1 <
        grid[nearbyUnvisitedNodes[i]].distance
      ) {
        grid[nearbyUnvisitedNodes[i]].distance = grid[currentCell].distance + 1;
        // The distance weight is constant as 1 can be subsituted if distance weight in the future
        grid[nearbyUnvisitedNodes[i]].path = [
          ...grid[currentCell].path,
          nearbyUnvisitedNodes[i],
        ];
      }
    }

    // Add Current Cell to visited Pile
    grid[currentCell].state = "visited";
    visitTimeline.push(currentCell);

    // Stop looking if the current visited cell is the final position
    if (currentCell === endCoord) {
      break;
    }

    // Add nearby nodes to queue
    nearbyUnvisitedNodes.forEach((element) => {
      if (!queue.includes(element)) {
        queue.push(element);
      }
    });
  }
  return [grid[endCoord].path, visitTimeline];
};

export const calculateDistance = (coord1, coord2) => {
  // Function to calculate Euclidean Distance
  let x1 = parseInt(coord1.split(",")[1]);
  let y1 = parseInt(coord1.split(",")[0]);
  let x2 = parseInt(coord2.split(",")[1]);
  let y2 = parseInt(coord2.split(",")[0]);

  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

const findNearbyNodes = (currentCell, numCol, numRow, grid) => {
  // Function to find nearby nodes that is not a wall and is not visited
  let nearbyUnvisitedNodes = [];
  let currentRow = parseInt(currentCell.split(",")[0]);
  let currentCol = parseInt(currentCell.split(",")[1]);
  let updatedCoord = "";
  // Check Top Position
  if (currentRow - 1 >= 0) {
    updatedCoord = `${currentRow - 1},${currentCol}`;
    if (
      grid[updatedCoord].state === "unvisited" ||
      grid[updatedCoord].state === "end"
    ) {
      nearbyUnvisitedNodes.push(updatedCoord);
    }
  }
  // Check Right Position
  if (currentCol + 1 < numCol) {
    updatedCoord = `${currentRow},${currentCol + 1}`;
    if (
      grid[updatedCoord].state === "unvisited" ||
      grid[updatedCoord].state === "end"
    ) {
      nearbyUnvisitedNodes.push(updatedCoord);
    }
  }
  // Check Bottom Position
  if (currentRow + 1 < numRow) {
    updatedCoord = `${currentRow + 1},${currentCol}`;
    if (
      grid[updatedCoord].state === "unvisited" ||
      grid[updatedCoord].state === "end"
    ) {
      nearbyUnvisitedNodes.push(updatedCoord);
    }
  }
  // Check Left Position
  if (currentCol - 1 >= 0) {
    updatedCoord = `${currentRow},${currentCol - 1}`;
    if (
      grid[updatedCoord].state === "unvisited" ||
      grid[updatedCoord].state === "end"
    ) {
      nearbyUnvisitedNodes.push(updatedCoord);
    }
  }

  return nearbyUnvisitedNodes;
};
