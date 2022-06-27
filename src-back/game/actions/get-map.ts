import { Map, MapItem, Position } from "../../../dist-common/game-types";

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

const getMap = (name: string): Map => {
  switch (name.toLowerCase()) {
    case "exchange":
    default:
      return {
        name,
        items: [
          {
            type: "flag",
            number: 1,
            x: 7,
            y: 1,
          },
          {
            type: "flag",
            number: 2,
            x: 9,
            y: 7,
          },
          {
            type: "flag",
            number: 3,
            x: 1,
            y: 4,
          },
        ],
        width: 12,
        height: 12 + 4,
        startingPositions: [...mapStartingPositionsB],
      };
  }
};

export default getMap;
