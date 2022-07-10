import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

import type {
  PlayerGameData,
  PlayerDetails,
  MainGameState,
} from "dist-common/game-types";
import type { ActionIncomingMessageObject } from "dist-common/game-action-types";
import canSetRegister from "dist-common/action-validators/can-set-register";
import canSubmitProgram from "dist-common/action-validators/can-submit-program";

import { wiggleAnimationMixin } from "../../animations/wiggle";

import CardsInHand from "./cards-in-hand";
import ProgramRegisters from "./program-registers";

const StyledCardsAndProgramRegisters = styled.div`
  display: inline-block;
`;

const StyledProgramRegisters = styled(ProgramRegisters)``;

const StyledCardsInHand = styled(CardsInHand)``;

const Heading = styled.div`
  margin: 0.5em 0 0.3em;
  text-align: center;
`;

const SubmitButton = styled.button<{ isLoading?: boolean }>`
  width: 100%;

  ${({ disabled }) => (!disabled ? wiggleAnimationMixin : "")}

  cursor: ${({ disabled, isLoading }) => {
    if (disabled) {
      return "not-allowed";
    }
    if (isLoading) {
      return "wait";
    }
    return "pointer";
  }};
`;

interface CardsAndProgramRegistersProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  sendViaWebSocket: (messageObject: ActionIncomingMessageObject) => void;
}

export default function CardsAndProgramRegisters({
  gameData,
  playerDetails,
  sendViaWebSocket,
}: CardsAndProgramRegistersProps) {
  const { playerId, playerPassword } = playerDetails;

  const { id, yourSecrets, gameState } = gameData;
  const { cardsInHand, programRegisters } = yourSecrets;
  const { finishedProgrammingPlayers, robots } = gameState as MainGameState;

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedRegisterIndex, setSelectedRegisterIndex] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const robot = robots.find((r) => r.playerId === playerDetails.playerId)!;
  const youFinishedProgramming = finishedProgrammingPlayers.includes(playerId);
  const fullyProgrammed = canSubmitProgram(
    playerId,
    gameState,
    programRegisters
  ).canPerform;

  useEffect(() => {
    if (selectedCardId !== null && selectedRegisterIndex !== null) {
      const { canPerform } = canSetRegister(
        selectedCardId,
        selectedRegisterIndex,
        cardsInHand,
        programRegisters,
        robots.find((r) => r.playerId === playerId)!,
        finishedProgrammingPlayers
      );

      if (!canPerform) {
        setIsLoading(false);
        setSelectedCardId(null);
        return;
      }

      setIsLoading(true);
      sendViaWebSocket({
        playerId,
        password: playerPassword,
        gameId: id,
        type: "action",
        action: {
          type: "set-register",
          playerId,
          cardId: selectedCardId,
          registerIndex: selectedRegisterIndex,
        },
      });
    }
  }, [selectedCardId, selectedRegisterIndex]);

  useEffect(() => {
    setIsLoading(false);
    setSelectedCardId(null);
    const firstEmptyRegister = programRegisters.findIndex(
      (register) => register === null
    );
    setSelectedRegisterIndex(
      firstEmptyRegister < 0 ? null : firstEmptyRegister
    );
  }, [
    cardsInHand.join(","),
    programRegisters.join(","),
    youFinishedProgramming,
  ]);

  if (robot.status !== "ok") {
    return null;
  }

  return (
    <StyledCardsAndProgramRegisters>
      <SubmitButton
        disabled={!fullyProgrammed || youFinishedProgramming}
        isLoading={isLoading}
        onClick={() => {
          if (!fullyProgrammed || youFinishedProgramming) {
            return;
          }
          setIsLoading(true);
          sendViaWebSocket({
            playerId,
            password: playerPassword,
            gameId: id,
            type: "action",
            action: {
              type: "finish-setting-registers",
              playerId,
            },
          });
        }}
      >
        Submit Program
      </SubmitButton>
      <Heading>
        Registers ({programRegisters.filter((a) => a).length}/
        {programRegisters.length} Set)
      </Heading>
      <StyledProgramRegisters
        cardWidth={6}
        isLoading={isLoading}
        lockedRegisters={
          youFinishedProgramming ? [0, 1, 2, 3, 4] : robot.lockedRegisters
        }
        gameData={gameData}
        handleRegisterSelect={(registerIndex) => {
          if (isLoading) {
            return;
          }
          if (
            selectedRegisterIndex === registerIndex &&
            programRegisters[registerIndex] !== null
          ) {
            setIsLoading(true);
            sendViaWebSocket({
              playerId,
              password: playerPassword,
              gameId: id,
              type: "action",
              action: {
                type: "set-register",
                playerId,
                cardId: null,
                registerIndex: selectedRegisterIndex,
              },
            });
            return;
          }
          setSelectedRegisterIndex(registerIndex);
        }}
        chosenRegister={selectedRegisterIndex}
      />
      {!youFinishedProgramming && (
        <>
          <Heading>Program Cards (Max {9 - robot.damagePoints})</Heading>
          <StyledCardsInHand
            cardWidth={5}
            isLoading={isLoading}
            gameData={gameData}
            handleCardChoice={(cardId) => {
              if (isLoading) {
                return;
              }
              setSelectedCardId(cardId);
            }}
            chosenCard={selectedCardId}
          />
        </>
      )}
    </StyledCardsAndProgramRegisters>
  );
}
