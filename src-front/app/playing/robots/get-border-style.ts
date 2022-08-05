import type { Robot } from "src-common/game-types";

export const ROBOT_DESIGNS: Robot["design"][] = [0, 1, 2, 3, 4, 5, 6, 7];

const getOldBorderStyle = (design: string) => {
  switch (design) {
    case "dotted":
    case "dashed":
    case "double":
      return {
        borderStyle: design,
        borderColor: "#ffffff",
      };
    case "ridge":
    case "outset":
      return {
        borderStyle: design,
      };
    case "#ffffff":
    case "#000000":
    case "#dcdcdc":
      return {
        borderStyle: "solid",
        borderColor: design,
      };
    default:
      return {};
  }
};

const getBorderStyle = (design: Robot["design"], colors: string[]) => {
  switch (design) {
    case 0:
      return {
        borderStyle: "solid",
        borderColor: colors[0],
      };
    case 1:
      return {
        borderStyle: "solid",
        borderColor: colors[1],
      };
    case 2:
      return {
        borderStyle: "double",
        borderColor: colors[2],
      };
    case 3:
      return {
        borderStyle: "double",
        borderColor: colors[3],
      };
    case 4:
      return {
        borderStyle: "dashed",
        borderColor: colors[0],
      };
    case 5:
      return {
        borderStyle: "dashed",
        borderColor: colors[1],
      };
    case 6:
      return {
        borderStyle: "dotted",
        borderColor: colors[2],
      };
    case 7:
      return {
        borderStyle: "dotted",
        borderColor: colors[3],
      };
    case "random":
      return {
        borderStyle: "solid",
        borderColor: "#000000",
      };
    default:
      return getOldBorderStyle(design);
  }
};

export default getBorderStyle;
