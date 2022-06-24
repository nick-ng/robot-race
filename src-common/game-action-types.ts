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

export interface FingerOnNoseAction extends BasicAction {
  type: "finger-on-nose";
}

export type GameAction = StartAction | SetRegisterAction | FingerOnNoseAction;
