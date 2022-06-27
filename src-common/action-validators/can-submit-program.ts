import { OnePlayerSecrets } from "../game-types";

const canSubmitProgram = (
  programRegisters: OnePlayerSecrets["programRegisters"]
):
  | { canPerform: true; message?: never }
  | { canPerform: false; message: string } => {
  if (programRegisters.some((register) => register === null)) {
    return { canPerform: false, message: "Some registers are still empty." };
  }

  return { canPerform: true };
};

export default canSubmitProgram;
