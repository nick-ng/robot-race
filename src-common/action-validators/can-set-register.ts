import { Robot, OnePlayerSecrets } from "../game-types";

const canSetRegister = (
  cardId: string | null,
  registerIndex: number,
  cardsInHand: OnePlayerSecrets["cardsInHand"],
  programRegisters: OnePlayerSecrets["programRegisters"],
  robot: Robot
):
  | { canPerform: true; message?: never }
  | { canPerform: false; message: string } => {
  if (
    !programRegisters ||
    !cardsInHand ||
    typeof registerIndex !== "number" ||
    !robot
  ) {
    return { canPerform: false, message: "Missing parameters." };
  }

  if (!cardId && !programRegisters[registerIndex]) {
    return { canPerform: false, message: "Register already empty." };
  }

  if (cardId && !cardsInHand.includes(cardId)) {
    return { canPerform: false, message: "That card isn't in your hand." };
  }

  if (robot.lockedRegisters.includes(registerIndex)) {
    return { canPerform: false, message: "That register is locked." };
  }

  return { canPerform: true };
};

export default canSetRegister;
