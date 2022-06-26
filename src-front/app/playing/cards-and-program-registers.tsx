import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

import {
  PlayerGameData,
  PlayerDetails,
  MainGameState,
} from "../../../dist-common/game-types";
import { ActionIncomingMessageObject } from "../../../dist-common/game-action-types";

import { getFlagEmoji } from "../utils";
import CardsInHand from "./cards-in-hand";
import ProgramRegisters from "./program-registers";

interface CardsAndProgramRegistersProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  sendViaWebSocket: (messageObject: ActionIncomingMessageObject) => void;
}

const StyledCardsAndProgramRegisters = styled.div`
  display: inline-block;
`;

const StyledProgramRegisters = styled(ProgramRegisters)``;

const StyledCardsInHand = styled(CardsInHand)``;

const Heading = styled.div`
  margin: 0.5em 0 0.3em;
  text-align: center;
`;

const NextFlag = styled.div`
  font-size: 18pt;
  margin-bottom: 0.5em;
`;

const wiggleAnimation = keyframes`
  0% {margin-left: -1em;}
  10% {margin-left: 1em;}
  20% {margin-left: -0.8em;}
  30% {margin-left: 0.8em;}
  40% {margin-left: -0.6em;}
  50% {margin-left: 0.6em;}
  60% {margin-left: -0.4em;}
  70% {margin-left: 0.4em;}
  80% {margin-left: -0.2em;}
  90% {margin-left: 0.2em;}
  100% {margin-left: 0em;}
`;

const wiggleAnimationMixin = css`
  animation: ${wiggleAnimation} 0.8s linear;
`;

const buttonRatio = 5;
const SubmitButton = styled.button<{ isLoading?: boolean }>`
  box-sizing: border-box;
  border: ${buttonRatio * 0.05}vw outset;
  background-color: gainsboro;
  padding: 0.5em;
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

  &:active {
    border-style: ${({ disabled }) => (disabled ? "outset" : "inset")};
  }
`;

export default function CardsAndProgramRegisters({
  gameData,
  playerDetails,
  sendViaWebSocket,
}: CardsAndProgramRegistersProps) {
  const { playerId, playerPassword } = playerDetails;

  const { id, yourSecrets, gameState } = gameData;
  const { cardsInHand, programRegisters } = yourSecrets;
  const { finishedProgrammingPlayers, flagsTouched } =
    gameState as MainGameState;

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedRegisterIndex, setSelectedRegisterIndex] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const youFinishedProgramming = finishedProgrammingPlayers.includes(playerId);

  useEffect(() => {
    if (selectedCardId !== null && selectedRegisterIndex !== null) {
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

  const fullyProgrammed = programRegisters.every(
    (register) => register !== null
  );

  return (
    <StyledCardsAndProgramRegisters>
      <NextFlag>
        Next: {getFlagEmoji()}
        {flagsTouched[playerId] + 1}
      </NextFlag>
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
        {fullyProgrammed
          ? "Submit Program"
          : "Submit Program (Set All Registers First)"}
      </SubmitButton>
      <Heading>Registers</Heading>
      <StyledProgramRegisters
        cardWidth={6}
        isLoading={isLoading}
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
      <Heading>Program Cards</Heading>
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
    </StyledCardsAndProgramRegisters>
  );
}
