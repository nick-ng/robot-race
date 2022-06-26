import { MapItem, Position } from "../../../dist-common/game-types";

const mapStartingPositionsA = Object.freeze([
  { x: 5, y: 14 },
  { x: 6, y: 14 },
  { x: 3, y: 14 },
  { x: 8, y: 14 },
  { x: 1, y: 14 },
  { x: 10, y: 14 },
  { x: 0, y: 14 },
  { x: 11, y: 14 },
]);

const mapStartingPositionsB = Object.freeze([
  { x: 5, y: 15 },
  { x: 6, y: 15 },
  { x: 3, y: 14 },
  { x: 8, y: 14 },
  { x: 1, y: 13 },
  { x: 10, y: 13 },
  { x: 0, y: 12 },
  { x: 11, y: 12 },
]);

const getMap = (
  _?: any
): {
  map: MapItem[][][];
  mapStartingPositions: Pick<Position, "x" | "y">[];
  numberOfFlags: number;
} => {
  const map: MapItem[][][] = [];

  for (let n = 0; n < 12 + 4; n++) {
    map.push([]);
    for (let m = 0; m < 12; m++) {
      map[n].push([]);
    }
  }

  map[1][7].push({
    type: "flag",
    number: 1,
  });

  map[7][9].push({
    type: "flag",
    number: 2,
  });

  map[4][1].push({
    type: "flag",
    number: 3,
  });

  return {
    map,
    mapStartingPositions: [...mapStartingPositionsB],
    numberOfFlags: 3,
  };
};

export default getMap;
