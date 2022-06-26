import { randomUUID } from "crypto";

import {
  Players,
  InitObject,
  GameSettings,
  GameSecrets,
  GameState,
  GameData,
  PlayerSecrets,
  LobbyGameState,
  MapItem,
  Robot,
} from "../../dist-common/game-types";
import { GameAction } from "../../dist-common/game-action-types";
import { performAction } from "./game-actions";
import getMap from "./actions/get-map";

const ROBOT_DESIGNS: readonly Robot["design"][] = Object.freeze([
  "double",
  "ridge",
  "grey",
  "outset",
  "dotted",
  "dashed",
  "white",
  "black",
]);

export default class Game {
  id: string;
  shortId: string;
  host: string;
  maxPlayers: number;
  players: Players;
  gameSettings: GameSettings;
  gameSecrets: GameSecrets;
  playerSecrets: PlayerSecrets;
  gameState: GameState;
  lastActionId: string;
  gameServer: string | null;

  constructor(initial: InitObject) {
    if (!initial.host) {
      throw {
        type: "error",
        message:
          "Game needs a host. Initiate with at least { host: hostPlayerId }",
      };
    }

    const defaultGameState: LobbyGameState = {
      state: "lobby",
      finishedProgrammingPlayers: [],
      poweringDownNextTurn: [],
      robots: [],
    };

    const defaultGameSecrets: GameSecrets = {
      password: randomUUID(),
      remainingDeck: [],
      instructionQueue: [],
    };

    const mapName = "";
    const { map, mapStartingPositions } = getMap(mapName);

    const temp: GameData = {
      maxPlayers: 8,
      players: [],
      gameSettings: {
        mapName,
        map,
        mapStartingPositions,
      },
      gameSecrets: defaultGameSecrets,
      playerSecrets: {},
      gameState: defaultGameState,
      lastActionId: "0-0",
      gameServer: null,
      ...initial,
    };

    this.id = temp.id;
    this.shortId = temp.shortId;

    this.host = temp.host;
    this.maxPlayers = temp.maxPlayers;

    this.players = temp.players;
    this.gameSettings = temp.gameSettings;
    this.gameSecrets = temp.gameSecrets;
    this.playerSecrets = temp.playerSecrets;
    this.gameState = temp.gameState;
    this.lastActionId = temp.lastActionId;
    this.gameServer = temp.gameServer;
  }

  getGameData = (): GameData => {
    return {
      id: this.id,
      shortId: this.shortId,
      host: this.host,
      maxPlayers: this.maxPlayers,
      players: this.players,
      gameSettings: this.gameSettings,
      gameSecrets: this.gameSecrets,
      playerSecrets: this.playerSecrets,
      gameState: this.gameState,
      lastActionId: this.lastActionId,
      gameServer: this.gameServer,
    };
  };

  getGameDataForPlayer = (playerId: string, playerPassword: string) => {
    if (
      !this.players.map((a) => a.id).includes(playerId) ||
      !this.playerSecrets[playerId] ||
      !playerPassword ||
      this.playerSecrets[playerId].password !== playerPassword
    ) {
      return {
        id: this.id,
        shortId: this.shortId,
        host: this.host,
        maxPlayers: this.maxPlayers,
        players: this.players,
        gameSettings: this.gameSettings,
        yourSecrets: {},
        gameState: this.gameState,
      };
    }

    return {
      id: this.id,
      shortId: this.shortId,
      host: this.host,
      maxPlayers: this.maxPlayers,
      players: this.players,
      gameSettings: this.gameSettings,
      yourSecrets: this.playerSecrets[playerId],
      gameState: this.gameState,
    };
  };

  addPlayer = (
    playerId: string,
    playerName: string,
    playerPassword: string
  ) => {
    if (this.gameState.state !== "lobby") {
      return {
        type: "error",
        message: "Game is already in progress",
      };
    }

    if (playerId === "server") {
      return {
        type: "error",
        message: 'Your player ID can\'t be "server"',
      };
    }

    if (!playerPassword) {
      return {
        type: "error",
        message: "Can't have a blank password",
      };
    }

    if (this.players.filter((a) => a.id === playerId).length > 0) {
      return {
        type: "error",
        message: "Player already in the game",
      };
    }

    if (this.players.length >= this.maxPlayers) {
      return {
        type: "error",
        message: "Can't add more players.",
      };
    }

    this.players.push({
      id: playerId,
      name: playerName,
    });

    this.playerSecrets[playerId] = {
      password: playerPassword,
      programRegisters: [null, null, null, null, null],
      cardsInHand: [],
    };

    const existingRobots = this.gameState.robots.length;

    this.gameState.robots.push({
      playerId,
      damagePoints: 0,
      lockedRegisters: [],
      lives: 3,
      position: {
        x: 0,
        y: 0,
        facing: "up",
      },
      design: ROBOT_DESIGNS[existingRobots],
    });

    return {
      type: "success",
    };
  };

  gameAction = (playerId: string, password: string, action: GameAction) => {
    if (
      playerId !== "server" &&
      this.players.filter((a) => a.id === playerId).length === 0
    ) {
      return {
        type: "error",
        message: "You aren't in this game",
      };
    }

    if (
      !(
        (playerId === "server" && password === this.gameSecrets.password) ||
        this.playerSecrets[playerId]?.password === password
      )
    ) {
      return {
        type: "error",
        message: "Wrong password",
      };
    }

    if (action.playerId !== playerId) {
      return {
        type: "error",
        message: "You can't perform an action for someone else.",
      };
    }

    const { message, automaticAction } = performAction(this, action);

    if (message !== "OK") {
      return {
        type: "error",
        message,
      };
    }

    return {
      type: "success",
      message,
      automaticAction,
    };
  };
}
