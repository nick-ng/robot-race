import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  PlayerGameData,
  PlayerDetails,
  MainGameState,
} from "../../../dist-common/game-types";
import { ActionIncomingMessageObject } from "../../../dist-common/game-action-types";

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

const buttonRatio = 5;
const SubmitButton = styled.button<{ isLoading?: boolean }>`
  box-sizing: border-box;
  border: ${buttonRatio * 0.05}vw outset black;
  background-color: gainsboro;
  padding: 0.5em;
  margin: 0.5em 0;
  width: 100%;

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
  const { finishedProgrammingPlayers } = gameState as MainGameState;

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
    setSelectedRegisterIndex(null);
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
      <ProgramRegisters
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
        {fullyProgrammed ? "Submit Program" : "Set All Registers"}
      </SubmitButton>
      <CardsInHand
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
