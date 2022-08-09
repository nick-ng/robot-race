import React from "react";
import styled from "styled-components";

import type {
  PlayerGameData,
  PlayerDetails,
  MainGameState,
} from "dist-common/game-types";
import type { ActionIncomingMessageObject } from "dist-common/game-action-types";
import { getPowerDownDecisionOrder } from "dist-common/utils";
import canPowerDownRobotValidator from "dist-common/action-validators/can-power-down";

import { wiggleAnimationMixin } from "../../animations/wiggle";
import TimerBar, { TimerContainer } from "./timer-bar";

const StyledPowerDownControl = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const PowerDownButton = styled.button`
  ${wiggleAnimationMixin}
`;

const SkipButton = styled.button`
  flex-grow: 1;
`;

interface PowerDownControlProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  sendViaWebSocket: (messageObject: ActionIncomingMessageObject) => void;
}

export default function PowerDownControl({
  gameData,
  playerDetails,
  sendViaWebSocket,
}: PowerDownControlProps) {
  const { playerId, playerPassword } = playerDetails;
  const { id, gameState, players, gameSettings } = gameData;

  const showTimer = gameSettings.timerStart !== "never";
  const powerDownOrder = getPowerDownDecisionOrder(gameState);
  const canPowerDownRobot = canPowerDownRobotValidator(
    playerDetails.playerId,
    gameState as MainGameState
  ).canPerform;

  if (powerDownOrder.length === 0) {
    return null;
  }

  return (
    <StyledPowerDownControl>
      {canPowerDownRobot && (
        <>
          <p>Have your robot repair itself next turn?</p>
          <p>
            After executing its current program, your robot will spend the next
            turn repairing itself. It cannot be programmed while it is repairing
            itself.
          </p>
        </>
      )}
      {showTimer && (
        <TimerContainer
          fullHeight={powerDownOrder[0] === playerDetails.playerId}
        >
          <TimerBar
            showText={powerDownOrder[0] === playerDetails.playerId}
            timerDuration={gameSettings.timerSeconds}
            key={powerDownOrder[0]}
          />
        </TimerContainer>
      )}
      {canPowerDownRobot && (
        <ButtonContainer>
          <PowerDownButton
            onClick={() => {
              sendViaWebSocket({
                playerId,
                password: playerPassword,
                gameId: id,
                type: "action",
                action: {
                  type: "power-down-next-turn",
                  playerId,
                  decision: "yes",
                },
              });
            }}
          >
            Self-Repair
          </PowerDownButton>
          <SkipButton
            onClick={() => {
              sendViaWebSocket({
                playerId,
                password: playerPassword,
                gameId: id,
                type: "action",
                action: {
                  type: "power-down-next-turn",
                  playerId,
                  decision: "no",
                },
              });
            }}
          >
            Skip
          </SkipButton>
        </ButtonContainer>
      )}
      {powerDownOrder[0] !== playerDetails.playerId && (
        <p>
          {players.find((p) => p.id === powerDownOrder[0])?.name} is deciding
          whether to self-repair.
        </p>
      )}
    </StyledPowerDownControl>
  );
}
