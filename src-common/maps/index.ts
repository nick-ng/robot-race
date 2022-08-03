import type { Map } from "../game-types";

import bloodbathChess from "./bloodbath-chess";
import checkmate from "./checkmate";
import deathTrap from "./death-trap";
import dizzyDash from "./dizzy-dash";
import islandHop from "./island-hop";
import islandKing from "./island-king";
import lostBearings from "./lost-bearings";
import riskyExchange from "./risky-exchange";
import twister from "./twister";

export const mapList: {
  mapName: string;
  mapDisplayName: string;
  description: [string, string][];
}[] = [
  {
    mapName: "dizzy dash",
    mapDisplayName: "Dizzy Dash: Easy, 2-8, Short",
    description: [
      ["Recommended Players", "2 - 8"],
      ["Length", "Short"],
      ["Difficulty", "Easy"],
    ],
  },
  {
    mapName: "death trap",
    mapDisplayName: "Death Trap: Easy, 2-4, Short",
    description: [
      ["Recommended Players", "2 - 4"],
      ["Length", "Short"],
      ["Difficulty", "Easy"],
    ],
  },
  {
    mapName: "checkmate",
    mapDisplayName: "Checkmate: Easy, 5-8, Short",
    description: [
      ["Recommended Players", "5 - 8"],
      ["Length", "Short"],
      ["Difficulty", "Easy"],
    ],
  },
  {
    mapName: "risky exchange",
    mapDisplayName: "Risky Exchange: Easy, 2-8, Medium",
    description: [
      ["Recommended Players", "2 - 8"],
      ["Length", "Medium"],
      ["Difficulty", "Easy"],
    ],
  },
  {
    mapName: "island hop",
    mapDisplayName: "Island Hop: Easy, 2-8, Medium",
    description: [
      ["Recommended Players", "2 - 8"],
      ["Length", "Medium"],
      ["Difficulty", "Easy"],
    ],
  },
  {
    mapName: "bloodbath chess",
    mapDisplayName: "Bloodbath Chess: Easy, 2-4, Medium",
    description: [
      ["Recommended Players", "2 - 4"],
      ["Length", "Medium"],
      ["Difficulty", "Easy"],
    ],
  },
  {
    mapName: "twister",
    mapDisplayName: "Twister: Easy, 5-8, Medium",
    description: [
      ["Recommended Players", "5 - 8"],
      ["Length", "Medium"],
      ["Difficulty", "Easy"],
    ],
  },
  {
    mapName: "island king",
    mapDisplayName: "Island King: Hard, 5-8, Short",
    description: [
      ["Recommended Players", "5 - 8"],
      ["Length", "Short"],
      ["Difficulty", "Hard"],
    ],
  },
  {
    mapName: "lost bearings",
    mapDisplayName: "Lost Bearings: Hard, 2-4, Medium",
    description: [
      ["Recommended Players", "2 - 4"],
      ["Length", "Short"],
      ["Difficulty", "Hard"],
    ],
  },
];

export const getMap = (name: string): Map => {
  switch (name.toLowerCase()) {
    case "bloodbath chess":
      return bloodbathChess;
    case "checkmate":
      return checkmate;
    case "death trap":
      return deathTrap;
    case "dizzy dash":
      return dizzyDash;
    case "island hop":
      return islandHop;
    case "island king":
      return islandKing;
    case "lost bearings":
      return lostBearings;
    case "twister":
      return twister;
    case "risky exchange":
    default:
      return riskyExchange;
  }
};

export default getMap;
