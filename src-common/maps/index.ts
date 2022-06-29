import { Map } from "../game-types";

import riskyExchange from "./risky-exchange";

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

export const getMap = (name: string): Map => {
  switch (name.toLowerCase()) {
    case "risky exchange":
    default:
      return riskyExchange;
  }
};

export default getMap;
