import type { Robot, MainGameState, GameState } from "./game-types";

const SOME_LETTERS = "ABCDEFGHJKLMNPQRSTUVWXY0123456789";

export const sleep = (ms: number) =>
  new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

export const randomString = (length: number) => {
  let string = "";
  for (let n = 0; n < length; n++) {
    const randomNumber = Math.floor(SOME_LETTERS.length * Math.random());
    string = string + SOME_LETTERS[randomNumber];
  }

  return string;
};

export const prevPlayer = (turnOrder: string[], activePlayer: string) => {
  const prevIndex =
    turnOrder.findIndex((player) => player === activePlayer) - 1;
  if (prevIndex < 0) {
    return turnOrder[turnOrder.length - 1];
  }

  return turnOrder[prevIndex];
};

export const getRespawnOrder = (
  robots: Robot[],
  seatOrder: MainGameState["seatOrder"]
) => {
  return seatOrder.filter((playerId) =>
    robots.find(
      (r) => r.status === "stand-by" && r.playerId === playerId && r.lives > 0
    )
  );
};

export const getPowerDownDecisionOrder = (gameState: GameState) => {
  if (gameState.state !== "main") {
    return [];
  }

  const {
    robots,
    seatOrder,
    finishedProgrammingPlayers,
    poweringDownNextTurn,
  } = gameState;

  if (finishedProgrammingPlayers.length < seatOrder.length) {
    return [];
  }

  return seatOrder.filter((playerId) =>
    robots.find(
      (r) =>
        r.playerId === playerId &&
        r.status === "ok" &&
        r.damagePoints > 0 &&
        r.damagePoints < 10 &&
        !poweringDownNextTurn.find((decision) => decision.playerId === playerId)
    )
  );
};

export const symmetricDifference = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const _difference = new Set(setA);
  for (const elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem);
    } else {
      _difference.add(elem);
    }
  }
  return _difference;
};

export const toAmbidextrousQuote = (inputString: string): string =>
  inputString.replaceAll("“", '"').replaceAll("”", '"');
