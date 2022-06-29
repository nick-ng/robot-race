import {
  AutomaticAction,
  CleanUpAction,
} from "../../../dist-common/game-action-types";
import Game from "../game-class";
import { isRobotDestroyed } from "./utils";

const cleanUp = (
  game: Game,
  _action: CleanUpAction
): {
  game: Game;
  message: string;
  automaticAction?: AutomaticAction;
} => {
  const { gameState } = game;
  const { robots, archiveMarkers } = gameState;
  // 10. repair and draw option cards in seat order

  // 20. discard program cards from non-locked registers

  // 30. respawn robots
  for (const robot of robots) {
    if (isRobotDestroyed(robot)) {
      robot.status = "stand-by";
      robot.damagePoints = 2;

      // temporary until you handle respawning properly
      const archiveMarker = archiveMarkers[robot.playerId];
      robot.position.x = archiveMarker.x;
      robot.position.y = archiveMarker.y;
      robot.status = "ok";
    }
  }

  return {
    game,
    message: "OK",
    automaticAction: {
      action: { playerId: "server", type: "deal-program-cards" },
      delay: 10,
    },
  };
};

export default cleanUp;
