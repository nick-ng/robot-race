import { ProgramCard } from "./game-types";

const cardList: readonly ProgramCard["action"][] = Object.freeze([
  // 1 - 6 (6)
  "U-Turn",
  "U-Turn",
  "U-Turn",
  "U-Turn",
  "U-Turn",
  "U-Turn",
  // 7 - 42 (36)
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  "Rotate Left",
  "Rotate Right",
  // 43 - 48 (6)
  "Back Up",
  "Back Up",
  "Back Up",
  "Back Up",
  "Back Up",
  "Back Up",
  // 49 - 66 (18)
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  "Move 1",
  // 67 - 78 (12)
  "Move 2",
  "Move 2",
  "Move 2",
  "Move 2",
  "Move 2",
  "Move 2",
  "Move 2",
  "Move 2",
  "Move 2",
  "Move 2",
  "Move 2",
  "Move 2",
  // 79 - 84 (6)
  "Move 3",
  "Move 3",
  "Move 3",
  "Move 3",
  "Move 3",
  "Move 3",
]);

if (process.env.NODE_ENV === "development") {
  console.debug("Move 1", cardList.filter((a) => a === "Move 1").length, 18);
  console.debug("Move 2", cardList.filter((a) => a === "Move 2").length, 12);
  console.debug("Move 3", cardList.filter((a) => a === "Move 3").length, 6);
  console.debug("Back Up", cardList.filter((a) => a === "Back Up").length, 6);
  console.debug(
    "Rotate Right",
    cardList.filter((a) => a === "Rotate Right").length,
    18
  );
  console.debug(
    "Rotate Left",
    cardList.filter((a) => a === "Rotate Left").length,
    18
  );
  console.debug("U-Turn", cardList.filter((a) => a === "U-Turn").length, 6);
}

export const getCardMap = (): { [cardId: string]: ProgramCard } => {
  return cardList.reduce((prev, curr, i) => {
    const priority = i + 1;
    const id = `program-card-${priority.toString().padStart(2, "0")}`;

    prev[id] = {
      id,
      action: curr,
      priority,
    };

    return prev;
  }, {} as { [cardId: string]: ProgramCard });
};

export const shuffle = <T>(inputArray: T[]): T[] =>
  [...inputArray]
    .map((data) => ({
      data,
      sortValue: Math.random(),
    }))
    .sort((a, b) => a.sortValue - b.sortValue)
    .map(({ data }) => data);
