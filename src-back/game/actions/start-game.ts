import type {
  GameAction,
  AutomaticAction,
} from "../../../dist-common/game-action-types";
import type { MainGameState } from "../../../dist-common/game-types";
import { getCardMap, shuffle } from "../../../dist-common/card-map";
import type Game from "../game-class";

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
    const startingDock = map.items.find(
      (mi) => mi.type === "dock" && mi.number === i + 1
    );
    if (robot && startingDock) {
      robot.position.x = startingDock.x;
      robot.position.y = startingDock.y;
      robot.archiveMarkerId = startingDock.id;
      robot.status = "ok";
    }
  });
  game.gameState.robots;

  return {
    game,
    message: "OK",
    automaticAction: {
      action: { playerId: "server", type: "deal-program-cards" },
      delay: 0,
    },
  };
};

export default startGame;
