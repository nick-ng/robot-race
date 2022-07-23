import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import type {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "dist-common/game-types";
import type { ActionIncomingMessageObject } from "dist-common/game-action-types";
import canSpawnRobot from "dist-common/action-validators/can-spawn-robot";

import { positionToOffsets } from "../utils";

const SIZE = 2;
const BUTTON_OFFSETS = Object.freeze({
  up: {
    top: `-${SIZE * 1.5}vw`,
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  down: {
    bottom: `-${SIZE * 1.5}vw`,
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  left: {
    bottom: "50%",
    left: `-${SIZE * 1.5}vw`,
    transform: "translate(0, 50%)",
  },
  right: {
    bottom: "50%",
    right: `-${SIZE * 1.5}vw`,
    transform: "translate(0, 50%)",
  },
});

const BUTTON_ROTATION = Object.freeze({
  up: { transform: "rotate(0.0turn)" },
  down: {
    transform: "rotate(0.5turn)",
  },
  left: {
    transform: "rotate(0.75turn)",
  },
  right: {
    transform: "rotate(0.25turn)",
  },
});

const SPAWN_LOCATION_OFFSETS: { id: string; x: -1 | 0 | 1; y: -1 | 0 | 1 }[] =
  [];

for (const x of [-1, 0, 1] as const) {
  for (const y of [-1, 0, 1] as const) {
    if (x === 0 && y === 0) {
      continue;
    }

    SPAWN_LOCATION_OFFSETS.push({
      id: `(${x})(${y})`,
      x,
      y,
    });
  }
}

const STYLE_X = {
  [-1]: { left: `-${SIZE * 1.5}vw` },
  [0]: { left: "50%", transform: "translate(-50%, 0)" },
  [1]: { right: `-${SIZE * 1.5}vw` },
};

const STYLE_Y = {
  [-1]: { top: `-${SIZE * 1.5}vw` },
  [0]: { bottom: "50%", transform: "translate(0, 50%)" },
  [1]: { bottom: `-${SIZE * 1.5}vw` },
};

const fadeAnimation = keyframes`
0% {
  opacity: 0.2;
}

100% {
  opacity: 1;
}
`;

const Button = styled.button`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: ${SIZE * 0.1}vw outset;
  width: ${SIZE * 1.2}vw;
  height: ${SIZE * 1.2}vw;
  font-size: ${SIZE * 0.6}vw;
  background-color: #808080;
  animation: ${fadeAnimation} 0.6s linear alternate infinite;
  z-index: 20;

  &:active {
    border-style: inset;
  }
`;

const bounceAnimation = keyframes`
0% {
  margin-bottom: 0.2vw;
}

50% {
  margin-bottom: -0.2vw;
}

100% {
  margin-bottom: 0.2vw;
}
`;

const StyledRobotSpawner = styled.div`
  position: absolute;
  width: ${SIZE}vw;
  height: ${SIZE}vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:hover ${Button} {
    opacity: 1;
    animation: none;
  }

  & > img {
    animation: ${bounceAnimation} 1s linear infinite;
  }
`;

const PowerButtonContainer = styled.div`
  position: absolute;
  button {
    display: block;
  }

  top: ${-1 * SIZE}vw;
  left: ${SIZE * 2.6}vw;
`;

const PowerButton = styled.button<{ isChosen: boolean }>`
  background-color: ${({ isChosen }) => (isChosen ? "#777777" : "#dcdcdc")};
  border-style: ${({ isChosen }) => (isChosen ? "inset" : "outset")};
`;

interface RobotSpawnerProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  sendViaWebSocket: (messageObject: ActionIncomingMessageObject) => void;
}

export default function RobotSpawner({
  gameData,
  playerDetails,
  sendViaWebSocket,
}: RobotSpawnerProps) {
  const { playerId, playerPassword } = playerDetails;
  const { id, gameSettings, gameState } = gameData;
  const { map } = gameSettings;
  const { robots, seatOrder } = gameState as MainGameState;

  const canPerformSpawnRobotAction = canSpawnRobot(
    playerDetails.playerId,
    robots,
    seatOrder
  ).canPerform;

  const [targetSquareOffsets, setTargetSquareOffsets] = useState({
    x: 0,
    y: 0,
  });
  const [powerDown, setPowerDown] = useState(false);

  useEffect(() => {
    setTargetSquareOffsets({ x: 0, y: 0 });
  }, [canPerformSpawnRobotAction]);

  const robot = robots.find((r) => r.playerId === playerDetails.playerId);
  const archiveMarker = map.items.find(
    (mi) => mi.id === robot?.archiveMarkerId
  );

  // 10. Determine if you need to show the spawning buttons
  if (canPerformSpawnRobotAction && archiveMarker) {
    // 20. Choose which square to spawn on if necessary
    if (
      targetSquareOffsets.x === 0 &&
      targetSquareOffsets.y === 0 &&
      robots.find(
        (r) =>
          r.status === "ok" &&
          r.position.x === archiveMarker.x &&
          r.position.y === archiveMarker.y
      )
    ) {
      const offsets1 = positionToOffsets(archiveMarker);

      return (
        <StyledRobotSpawner
          style={{
            top: offsets1.y,
            left: offsets1.x,
          }}
        >
          {SPAWN_LOCATION_OFFSETS.map((pos) => {
            const spawnX = pos.x + archiveMarker.x;
            const spawnY = pos.y + archiveMarker.y;
            if (
              robots.find(
                (r) =>
                  r.status === "ok" &&
                  r.position.x === spawnX &&
                  r.position.y === spawnY
              ) ||
              map.items.find(
                (mi) =>
                  ["pit"].includes(mi.type) &&
                  mi.x === spawnX &&
                  mi.y === spawnY
              ) ||
              spawnX < 0 ||
              spawnY < 0 ||
              spawnX >= map.width ||
              spawnY >= map.height
            ) {
              return null;
            }
            const style = {
              ...STYLE_X[pos.x],
              ...STYLE_Y[pos.y],
            };

            return (
              <Button
                key={pos.id}
                style={style}
                onClick={() => {
                  setTargetSquareOffsets({ x: pos.x, y: pos.y });
                }}
              >
                <img src="/robot-triangle.svg" />
              </Button>
            );
          })}
          <PowerButtonContainer>
            <PowerButton
              isChosen={!powerDown}
              onClick={() => {
                setPowerDown(false);
              }}
            >
              Powered On
            </PowerButton>
            <PowerButton
              isChosen={powerDown}
              onClick={() => {
                setPowerDown(true);
              }}
            >
              Powered Down
            </PowerButton>
          </PowerButtonContainer>
        </StyledRobotSpawner>
      );
    }

    const offsets2 = positionToOffsets({
      x: archiveMarker.x + targetSquareOffsets.x,
      y: archiveMarker.y + targetSquareOffsets.y,
    });
    // 30. Choose which direction to face
    return (
      <StyledRobotSpawner
        style={{
          top: offsets2.y,
          left: offsets2.x,
        }}
      >
        {targetSquareOffsets.x === 0 && targetSquareOffsets.y === 0 ? (
          <img src="/robot-triangle.svg" />
        ) : (
          <Button
            onClick={() => {
              setTargetSquareOffsets({ x: 0, y: 0 });
            }}
          >
            ↩️
          </Button>
        )}
        {(
          Object.keys(BUTTON_OFFSETS) as ("up" | "down" | "left" | "right")[]
        ).map((facing) => (
          <Button
            key={facing}
            style={BUTTON_OFFSETS[facing]}
            onClick={() => {
              sendViaWebSocket({
                playerId,
                password: playerPassword,
                gameId: id,
                type: "action",
                action: {
                  type: "spawn-robot",
                  playerId,
                  facing: facing,
                  x: archiveMarker.x + targetSquareOffsets.x,
                  y: archiveMarker.y + targetSquareOffsets.y,
                  powerDown,
                },
              });
            }}
          >
            <img style={BUTTON_ROTATION[facing]} src="/robot-triangle.svg" />
          </Button>
        ))}
        <PowerButtonContainer>
          <PowerButton
            isChosen={!powerDown}
            onClick={() => {
              setPowerDown(false);
            }}
          >
            Don't Repair
          </PowerButton>
          <PowerButton
            isChosen={powerDown}
            onClick={() => {
              setPowerDown(true);
            }}
          >
            Self-Repair
          </PowerButton>
        </PowerButtonContainer>
      </StyledRobotSpawner>
    );
  }

  return null;
}
