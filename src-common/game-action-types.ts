import type { Robot, OnePlayerSecrets } from "./game-types";

interface BasicAction {
  playerId: string;
  type: string;
}

export interface StartAction extends BasicAction {
  type: "start";
}

export interface DealProgramCardsAction extends BasicAction {
  type: "deal-program-cards";
}

export interface SetRegisterAction extends BasicAction {
  type: "set-register";
  cardId: string | null;
  registerIndex: number;
}

export interface SetManyRegisterAction extends BasicAction {
  type: "set-many-registers";
  programRegisters: OnePlayerSecrets["programRegisters"];
  cardsInHand: OnePlayerSecrets["cardsInHand"];
  setRegisterTimestamp: number;
}

export interface FinishSettingRegistersAction extends BasicAction {
  type: "finish-setting-registers";
}

export interface ForceSetRegistersAction extends BasicAction {
  type: "force-set-registers";
  turn: number;
}

export interface PowerDownNextTurnAction extends BasicAction {
  type: "power-down-next-turn";
  decision: "yes" | "no";
}

export interface ProcessRegisterAction extends BasicAction {
  type: "process-registers";
}

export interface CleanUpAction extends BasicAction {
  type: "clean-up";
}

export interface SpawnRobotAction extends BasicAction {
  type: "spawn-robot";
  facing: Robot["position"]["facing"];
  x: number;
  y: number;
  powerDown: boolean;
}

export type GameAction =
  | StartAction
  | DealProgramCardsAction
  | SetRegisterAction
  | SetManyRegisterAction
  | FinishSettingRegistersAction
  | ForceSetRegistersAction
  | PowerDownNextTurnAction
  | ProcessRegisterAction
  | CleanUpAction
  | SpawnRobotAction;

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
