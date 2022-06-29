import { MapItem } from "../../../../dist-common/game-types";

export const getPitStyles = (cellItems: MapItem[]) => {
  if (cellItems.find((c) => c.type === "pit")) {
    return {
      boxShadow: "inset 0 0 1px #ff0000",
      background: "radial-gradient(#000000ff 20%, #00000000)",
    };
  }

  return {};
};

export const getPitToolTip = (cellItems: MapItem[]) => {
  if (cellItems.find((c) => c.type === "pit")) {
    return "Falling into a pit will destroy your robot. Watch out!";
  }

  return null;
};
