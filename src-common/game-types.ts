export interface Scores {
  [index: string]: number;
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

export interface Position {
  x: number;
  y: number;
  facing: "up" | "down" | "left" | "right";
}

export interface Robot {
  playerId: string;
  damagePoints: number;
  lockedRegisters: number[];
  lives: number;
  position: Position;
  design:
    | "white"
    | "black"
    | "grey"
    | "dotted"
    | "dashed"
    | "double"
    | "ridge"
    | "outset";
}

export type InstructionItem = {
  playerId: string;
  payload: ProgramCard;
};

export interface LobbyGameState {
  state: "lobby";
}

export interface MainGameState {
  state: "main";
  seatOrder: string[];
  finishedProgrammingPlayers: string[];
  poweringDownNextTurn: string[];
  cardMap: { [cardId: string]: ProgramCard };
  robots: Robot[];
  discardedCards: string[];
}

export type OverGameState = Omit<MainGameState, "state"> & {
  state: "over";
};

export type GameState = LobbyGameState | MainGameState | OverGameState;

export interface OnePlayerSecrets {
  password: string;
  programRegisters: [
    string | null,
    string | null,
    string | null,
    string | null,
    string | null
  ];
  cardsInHand: string[];
}

export interface ConveyorMapItem {
  type: "conveyor";
  direction: "up" | "down" | "left" | "right";
  speed: 1 | 2;
}

export interface PitMapItem {
  type: "pit";
}

export interface GearMapItem {
  type: "gear";
  direction: "clockwise" | "counter-clockwise"; // CW: Green, CCW: Red
}

export interface PusherMapItem {
  type: "pusher";
  direction: "up" | "down" | "left" | "right";
  activeRegisters: number[];
}

export interface RepairMapItem {
  type: "repair";
}

export type MapItem =
  | ConveyorMapItem
  | PitMapItem
  | GearMapItem
  | PusherMapItem;
export interface PlayerSecrets {
  [key: string]: OnePlayerSecrets;
}

export interface GameSecrets {
  password: string;
  remainingDeck: string[];
  instructionQueue: InstructionItem[];
}

export interface GameSettings {
  mapName: string;
  map: MapItem[][][];
}

export interface Player {
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
  lastActionId: string;
  gameServer: string | null;
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
