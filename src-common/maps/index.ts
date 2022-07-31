import type { Map } from "../game-types";

import riskyExchange from "./risky-exchange";
import checkmate from "./checkmate";

export const mapList: {
  mapName: string;
  mapDisplayName: string;
  description: [string, string][];
}[] = [
  {
    mapName: "checkmate",
    mapDisplayName: "Checkmate",
    description: [
      ["Recommended Players", "5 - 8"],
      ["Length", "Short"],
      ["Difficulty", "Easy"],
    ],
  },
  {
    mapName: "risky exchange",
    mapDisplayName: "Risky Exchange",
    description: [
      ["Recommended Players", "2 - 8"],
      ["Length", "Medium"],
      ["Difficulty", "Easy"],
    ],
  },
];

export const getMap = (name: string): Map => {
  switch (name.toLowerCase()) {
    case "checkmate":
      return checkmate;
    case "risky exchange":
    default:
      return riskyExchange;
  }
};

export default getMap;
