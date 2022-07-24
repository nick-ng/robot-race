import assert from "node:assert/strict";
import type { MainGameState } from "src-common/game-types";

import { getPowerDownDecisionOrder } from "../../../../src-common/utils";

import Game from "../../game-class";
import finishSettingRegisters from "../finish-setting-registers";

const gameData0 = require("./finish-setting-registers-data/game-data-0.json");

describe("Finish setting registers action", () => {
  it("should reset power down decisions after last person submits program.", (done) => {
    const testGame = new Game(JSON.parse(JSON.stringify(gameData0)));

    assert.equal(3, testGame.gameState.finishedProgrammingPlayers.length);

    const { message, automaticAction } = finishSettingRegisters(testGame, {
      type: "finish-setting-registers",
      playerId: "loahc8dw-1sc7-sbmn-fngz-3a6si14x4wvx",
    });

    const unfinishedPlayers = (
      testGame.gameState as MainGameState
    ).seatOrder.filter(
      (id) => !testGame.gameState.finishedProgrammingPlayers.includes(id)
    );

    assert.equal("OK", message);
    assert.equal(4, testGame.gameState.finishedProgrammingPlayers.length);
    assert.equal(undefined, automaticAction);
    assert.notStrictEqual([], unfinishedPlayers);

    assert.equal(3, testGame.gameState.poweringDownNextTurn.length);

    done();
  });
});
