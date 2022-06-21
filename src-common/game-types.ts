export interface Scores {
  [index: string]: number;
}

export interface LobbyGameState {
  state: "lobby";
}

export interface ProgramCard {
  id: string;
  action:
    | "Move 1"
    | "Move 2"
    | "Move 3"
    | "Back Up"
    | "Rotate Right"
    | "Rotate Left"
    | "U-Turn";
  priority: number;
}

export interface RobotDamage {
  damagePoints: number;
  lockedRegisters: number[];
}

export interface MainGameState {
  state: "main";
  seatOrder: string[];
  finishedProgrammingPlayers: string[];
  poweringDownNextTurn: string[];
  cardMap: { [cardId: string]: ProgramCard };
  robotsDamage: { [playerId: string]: RobotDamage };
  robotLives: { [playerId: string]: number };
}

export type OverGameState = Omit<MainGameState, "state"> & {
  state: "over";
};

export type GameState = LobbyGameState | MainGameState | OverGameState;

export interface OnePlayerSecrets {
  password: string;
  programRegisters: string[];
  cardsInHand: string[];
}

export interface PlayerSecrets {
  [key: string]: OnePlayerSecrets;
}

export interface GameSecrets {
  fullDeck: string[];
}

export interface GameSettings {
  cardsPerPlayer: number;
}

interface Player {
  id: string;
  name: string;
}

export type Players = Player[];

export interface GameData {
  id: string;
  shortId: string;
  host: string;
  maxPlayers: number;
  players: Players;
  gameSettings: GameSettings;
  gameSecrets: GameSecrets;
  playerSecrets: PlayerSecrets;
  gameState: GameState;
  lastActionId?: string;
  gameServer?: string;
}

export type InitObject = Partial<GameData> & {
  host: string;
  id: string;
  shortId: string;
};

export type PlayerGameData = Omit<
  GameData,
  "gameSecrets" | "playerSecrets" | "lastActionId" | "gameServer"
> & { yourSecrets: OnePlayerSecrets };

export interface PlayerDetails {
  playerName: string;
  playerId: string;
  playerPassword: string;
}
