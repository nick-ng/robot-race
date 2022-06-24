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

export type GameAction =
  | StartAction
  | SetRegisterAction
  | FinishSettingRegistersAction;
