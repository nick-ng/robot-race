import { DockMapItem, MapItemNoId } from "dist-common/game-types";

export const getDockText = (cellItems: MapItemNoId[]) => {
  const dock = cellItems.find((a) => a.type === "dock") as DockMapItem;

  if (dock) {
    return `🤖${dock.number}`;
  }

  return null;
};
