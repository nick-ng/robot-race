import assert from "node:assert/strict";

import { getPowerDownDecisionOrder } from "../../../../src-common/utils";

import Game from "../../game-class";
import powerDownNextTurn from "../power-down-next-turn";

const gameData1 = require("./power-down-next-turn-data/game-data-1.json");
const gameData2 = require("./power-down-next-turn-data/game-data-2.json");

describe("Powering down action", () => {
  it("should process the next turn when everyone is powered down or finished programming", (done) => {
    const testGame = new Game(gameData1);

    // console.log("testGame.gameState", {
    //   ...testGame.gameState,
    //   cardMap: {},
    //   discardedCards: [],
    // } as Game["gameState"]);

    console.log(
      "getPowerDownDecisionOrder",
      getPowerDownDecisionOrder(testGame.gameState)
    );

    done();
  });
});
