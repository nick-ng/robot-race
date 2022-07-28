import type { Robot } from "src-common/game-types";

const EXTRA = 0.4;
const LASER_WIDTH = "5px";

const getLaserStyle = (
  laser: Robot["laser"],
  gridSize: number,
  gridUnit: string
) => {
  if (!laser) {
    return {
      display: "none",
    };
  }

  if (laser.height > 0) {
    return {
      width: LASER_WIDTH,
      bottom: `${gridSize / 2 + EXTRA}${gridUnit}`,
      height: `${gridSize * laser.height - EXTRA}${gridUnit}`,
      left: 0,
      right: 0,
    };
  }

  if (laser.height < 0) {
    return {
      width: LASER_WIDTH,
      top: `${gridSize / 2 + EXTRA}${gridUnit}`,
      height: `${gridSize * -laser.height - EXTRA}${gridUnit}`,
      left: 0,
      right: 0,
    };
  }

  if (laser.width > 0) {
    return {
      height: LASER_WIDTH,
      right: `${gridSize / 2 + EXTRA}${gridUnit}`,
      width: `${gridSize * laser.width - EXTRA}${gridUnit}`,
      top: 0,
      bottom: 0,
    };
  }

  if (laser.width < 0) {
    return {
      height: LASER_WIDTH,
      left: `${gridSize / 2 + EXTRA}${gridUnit}`,
      width: `${gridSize * -laser.width - EXTRA}${gridUnit}`,
      top: 0,
      bottom: 0,
    };
  }

  return {
    display: "none",
  };
};

export default getLaserStyle;
