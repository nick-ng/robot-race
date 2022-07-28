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

export const setOneRegister = ({
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

export const sortAndFilter = (
  array1: (string | null)[],
  array2: (string | null)[]
): string[] => {
  return (array1.concat(array2).filter((a) => a) as string[]).sort((a, b) =>
    a.localeCompare(b)
  );
};

export const areArraysSame = (array1: string[], array2: string[]): boolean => {
  const difference = array1
    .filter((x) => !array2.includes(x))
    .concat(array2.filter((x) => !array1.includes(x)));

  return difference.length === 0;
};
