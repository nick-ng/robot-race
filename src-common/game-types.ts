export interface Scores {
  [index: string]: number;
}

export interface LobbyGameState {
  state: "lobby";
}

export interface MainGameState {
  state: "main";
  seatOrder: string[];
  chosenCardPlayers: string[];
  fingerOnNose: string[];
  cardMap: { [cardId: string]: string };
}

export type OverGameState = Omit<MainGameState, "state"> & {
  state: "over";
};

export type GameState = LobbyGameState | MainGameState | OverGameState;

export interface OnePlayerSecrets {
  password: string;
  chosenCard?: string;
  cardsInHand?: string[];
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
