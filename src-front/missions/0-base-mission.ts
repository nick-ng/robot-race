import type {
  GameData,
  GameSecrets,
  MainGameState,
  GameSettings,
} from "dist-common/game-types";
import { getCardMap } from "dist-common/card-map";

export const getBaseGameData = (
  playerId: string,
  remainingDeck: GameSecrets["remainingDeck"]
): Omit<GameData, "gameState" | "gameSettings"> => ({
  id: "1",
  shortId: "1",
  host: playerId,
  maxPlayers: 8,
  players: [{ id: playerId, name: "Practice" }],
  playerSecrets: {
    [playerId]: {
      password: playerId,
      programRegisters: [null, null, null, null, null],
      cardsInHand: [],
      setRegisterTimestamp: 0,
    },
  },
  gameSecrets: {
    password: "server",
    remainingDeck,
    instructionQueue: [],
  },
  lastActionId: "0-0",
  gameServer: null,
  resumeAction: null,
});

export const getBaseGameState = (
  playerId: string
): Omit<MainGameState, "robots" | "discardedCards"> => ({
  state: "main",
  turn: 0,
  turnPhase: 0,
  seatOrder: [playerId],
  finishedProgrammingPlayers: [],
  poweringDownNextTurn: [],
  flagsTouched: { [playerId]: 0 },
  cardMap: getCardMap(),
});

export const getBaseGameSettings = (): Omit<GameSettings, "map"> => ({
  timerSeconds: 30,
  timerStart: "never",
});
