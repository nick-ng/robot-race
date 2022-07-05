import { MainGameState } from "src-common/game-types";
import {
  AutomaticAction,
  CleanUpAction,
} from "../../../dist-common/game-action-types";
import Game from "../game-class";
import { isRobotDestroyed, setRobotDamage } from "./utils";

const cleanUp = (
  game: Game,
  _action: CleanUpAction
): {
  game: Game;
  message: string;
  automaticAction?: AutomaticAction;
} => {
  const { gameState } = game;
  const { robots, seatOrder } = gameState as MainGameState;
  // 10. repair and draw option cards in seat order

  // 20. discard program cards from non-locked registers

  // 30. respawn robots
  for (const playerId of seatOrder) {
    const robot = robots.find((r) => r.playerId === playerId)!;
    if (isRobotDestroyed(robot) && robot.lives > 0) {
      robot.status = "stand-by";
      setRobotDamage(robot, 2);
    }
  }

  if (robots.some((robot) => robot.status === "stand-by")) {
    return {
      game,
      message: "OK",
    };
  }

  return {
    game,
    message: "OK",
    automaticAction: {
      action: { playerId: "server", type: "deal-program-cards" },
      delay: 0,
    },
  };
};

export default cleanUp;
