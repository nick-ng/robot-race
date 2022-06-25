interface BasicAction {
  playerId: string;
  type: string;
}

export interface StartAction extends BasicAction {
  type: "start";
}

export interface SetRegisterAction extends BasicAction {
  type: "set-register";
  cardId: string | null;
  registerIndex: number;
}

export interface FinishSettingRegistersAction extends BasicAction {
  type: "finish-setting-registers";
}

export interface ProcessRegisterAction extends BasicAction {
  type: "process-registers";
}

export type GameAction =
  | StartAction
  | SetRegisterAction
  | FinishSettingRegistersAction
  | ProcessRegisterAction;

interface BasicIncomingMessageObject {
  playerId: string;
  password: string;
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

export interface AutomaticAction {
  action: GameAction;
  delay: number;
}
