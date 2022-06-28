import { MapItem } from "../../../../dist-common/game-types";

export const getWallStyles = (cellItems: MapItem[]) => {
  return cellItems.reduce((acc, mapItem) => {
    if (mapItem.type !== "wall") {
      return acc;
    }

    let directionTitleCase = "";
    if (mapItem.x1 > mapItem.x) {
      directionTitleCase = "Right";
    }
    if (mapItem.x1 < mapItem.x) {
      directionTitleCase = "Left";
    }
    if (mapItem.y1 > mapItem.y) {
      directionTitleCase = "Bottom";
    }
    if (mapItem.y1 < mapItem.y) {
      directionTitleCase = "Top";
    }

    if (!directionTitleCase) {
      return acc;
    }

    return {
      ...acc,
      [`border${directionTitleCase}Color`]: "yellow",
      [`border${directionTitleCase}Width`]: "3px",
      [`border${directionTitleCase}Style`]: "solid",
    };
  }, {});
};

export const getWallToolTip = (mapItems: MapItem[], x: number, y: number) => {
  if (
    mapItems.filter(
      (mi) =>
        mi.type === "wall" &&
        ((mi.x === x && mi.y === y) || (mi.x1 === x && mi.y1 === y))
    ).length > 0
  ) {
    return "Walls block robots from moving.";
  }

  return null;
};
