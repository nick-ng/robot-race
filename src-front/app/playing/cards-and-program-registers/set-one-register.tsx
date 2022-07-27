import type {
  OnePlayerSecrets,
  Robot,
  MainGameState,
} from "dist-common/game-types";
import type { SetManyRegisterAction } from "dist-common/game-action-types";
import canSetRegister from "../../../../dist-common/action-validators/can-set-register";

type SetOneCardParams = {
  cardId: string | null;
  registerIndex: number;
  cardsInHand: OnePlayerSecrets["cardsInHand"];
  programRegisters: OnePlayerSecrets["programRegisters"];
  robot: Robot;
  finishedProgrammingPlayers: MainGameState["finishedProgrammingPlayers"];
};

const setOneRegister = ({
  cardId,
  registerIndex,
  cardsInHand,
  programRegisters,
  robot,
  finishedProgrammingPlayers,
}: SetOneCardParams): Pick<
  SetManyRegisterAction,
  "cardsInHand" | "programRegisters" | "setRegisterTimestamp"
> | null => {
  const { canPerform } = canSetRegister(
    cardId,
    registerIndex,
    cardsInHand,
    programRegisters,
    robot,
    finishedProgrammingPlayers
  );

  if (!canPerform) {
    return null;
  }

  const newProgramRegisters = [
    ...programRegisters,
  ] as OnePlayerSecrets["programRegisters"];
  const newCardsInHand = cardsInHand.filter((a) => a !== cardId);

  const existingCardInRegister = programRegisters[registerIndex];
  if (existingCardInRegister !== null) {
    newCardsInHand.push(existingCardInRegister);
  }

  newProgramRegisters[registerIndex] = cardId;

  return {
    cardsInHand: newCardsInHand,
    programRegisters: newProgramRegisters,
    setRegisterTimestamp: Date.now(),
  };
};

export default setOneRegister;
