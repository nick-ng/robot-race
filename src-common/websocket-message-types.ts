import { GameAction } from "./game-action-types";

interface BasicIncomingMessageObject {
  playerId: string;
  playerPassword: string;
  gameId: string;
}

interface ListenIncomingMessageObject extends BasicIncomingMessageObject {
  type: "listen";
}

interface JoinIncomingMessageObject extends BasicIncomingMessageObject {
  type: "join";
}

export interface ActionIncomingMessageObject
  extends BasicIncomingMessageObject {
  type: "action";
  action: GameAction;
}

export type WebsocketIncomingMessageObject =
  | ListenIncomingMessageObject
  | JoinIncomingMessageObject
  | ActionIncomingMessageObject;
