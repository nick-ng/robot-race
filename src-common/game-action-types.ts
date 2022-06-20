interface BasicAction {
  playerId: string;
  type: string;
}

export interface StartAction extends BasicAction {
  type: "start";
}

export interface ChooseCardAction extends BasicAction {
  type: "choose-card";
  cardId: string;
}

export interface FingerOnNoseAction extends BasicAction {
  type: "finger-on-nose";
}

export type GameAction = StartAction | ChooseCardAction | FingerOnNoseAction;
