import type { Map } from "../game-types";

import riskyExchange from "./risky-exchange";
import checkmate from "./checkmate";

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
