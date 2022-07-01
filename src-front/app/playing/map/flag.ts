import { MapItem, FlagMapItem } from "dist-common/game-types";
import { getFlagEmoji } from "../../utils";

export const getFlagText = (cellItems: MapItem[]) => {
  const flag = cellItems.find((a) => a.type === "flag") as FlagMapItem;
  if (cellItems.find((a) => a.type === "flag")) {
    return `${getFlagEmoji()}${flag.number}`;
  }

  return null;
};

export const getFlagToolTip = (cellItems: MapItem[]) => {
  if (cellItems.find((a) => a.type === "flag")) {
    return "Get all flags in order (1, 2, 3, etc.) to win the game.";
  }

  return null;
};
