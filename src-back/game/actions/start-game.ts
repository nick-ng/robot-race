import {
  GameAction,
  AutomaticAction,
} from "../../../dist-common/game-action-types";

import { MainGameState } from "../../../dist-common/game-types";
import { getCardMap } from "../../../dist-common/card-map";
import Game from "../game-class";
import { shuffle } from "../utils";

const startGame = (
  game: Game,
  action: GameAction
): { game: Game; message: string; automaticAction?: AutomaticAction } => {
  const { gameState, players, host, gameSettings } = game;
  if (gameState.state !== "lobby") {
    return {
      game,
      message: "Game is already in progress.",
    };
  }

  if (action.playerId !== host) {
    return {
      game,
      message: "Only the host can start the game.",
    };
  }

  const playerIds = players.map((a) => a.id);
  const seatOrder = shuffle(playerIds);

  const cardMap = getCardMap();

  game.gameState = {
    ...game.gameState,
    state: "main",
    seatOrder,
    finishedProgrammingPlayers: [],
    poweringDownNextTurn: [],
    discardedCards: Object.keys(cardMap),
    cardMap,
  } as MainGameState;

  const { map } = gameSettings;

  seatOrder.forEach((playerId, i) => {
    const robot = game.gameState.robots.find((r) => r.playerId === playerId);
    const mapStartingPosition = map.startingPositions[i];
    if (robot && mapStartingPosition) {
      robot.position.x = mapStartingPosition.x;
      robot.position.y = mapStartingPosition.y;
      game.gameState.archiveMarkers[playerId] = {
        x: mapStartingPosition.x,
        y: mapStartingPosition.y,
      };
    }
  });
  game.gameState.robots;

  return {
    game,
    message: "OK",
    automaticAction: {
      action: { playerId: "server", type: "deal-program-cards" },
      delay: 10,
    },
  };
};

export default startGame;
