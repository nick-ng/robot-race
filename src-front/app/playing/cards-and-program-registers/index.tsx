import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

import type {
  PlayerGameData,
  PlayerDetails,
  MainGameState,
} from "dist-common/game-types";
import type { ActionIncomingMessageObject } from "dist-common/game-action-types";
import canSubmitProgram from "dist-common/action-validators/can-submit-program";

import { setOneRegister, sortAndFilter, areArraysSame } from "./utils";

import { wiggleAnimationMixin } from "../../../animations/wiggle";
import { useOptions } from "../../../hooks/options-context";

import CardsInHand from "./cards-in-hand";
import ProgramRegisters from "./program-registers";
import { isTimerVisible } from "../utils";

const StyledCardsAndProgramRegisters = styled.div`
  display: inline-block;
`;

const StyledProgramRegisters = styled(ProgramRegisters)``;

const StyledCardsInHand = styled(CardsInHand)``;

const Heading = styled.div`
  margin: 0.5em 0 0.3em;
  text-align: center;
  position: relative;
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

const TimerAnimation = keyframes`
0% {
  width: 100%;
}

100% {
  width: 0%;
}
`;

const WhiteBlackAnimation = keyframes`
0% {
  color: #ffffff;
}

100% {
  color: #000000;
}
`;

const TimerOuterBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
`;

const TimerInnerBar = styled.div<{ timerDuration: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  animation-name: ${TimerAnimation};
  animation-duration: ${({ timerDuration }) => timerDuration}s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: 1;
  background-color: #ffffff;
`;

const TimerText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  animation-name: ${WhiteBlackAnimation};
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  z-index: 1;
  font-weight: bold;
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

  const { id, yourSecrets, gameState, gameSettings } = gameData;
  const {
    cardsInHand: actualCardsInHand,
    programRegisters: actualProgramRegisters,
    setRegisterTimestamp: actualTimestamp,
  } = yourSecrets;

  const { finishedProgrammingPlayers, robots, seatOrder } =
    gameState as MainGameState;

  const [predictedCardsInHand, setPredictedCardsInHand] =
    useState(actualCardsInHand);
  const [predictedProgramRegisters, setPredictedProgramRegisters] = useState(
    actualProgramRegisters
  );
  const [timestamp, setTimestamp] = useState(0);

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedRegisterIndex, setSelectedRegisterIndex] = useState<
    number | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const { options } = useOptions();
  const timerSound = useRef(new Audio("/timer.mp3")).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const robot = robots.find((r) => r.playerId === playerDetails.playerId)!;
  const youFinishedProgramming = finishedProgrammingPlayers.includes(playerId);

  const actualTimerSeconds =
    gameSettings.timerSeconds - (options.ping || 0) / 2000;

  const showTimer = isTimerVisible({
    finishedProgrammingPlayers,
    playerId,
    robots,
    seatOrder,
    timerStart: gameSettings.timerStart,
  });

  const actualCards = sortAndFilter(actualCardsInHand, actualProgramRegisters);
  const predictedCards = sortAndFilter(
    predictedCardsInHand,
    predictedProgramRegisters
  );
  const cardsAreSame = areArraysSame(actualCards, predictedCards);
  const timestampIsNewer = actualTimestamp > timestamp;

  const cardsInHand = cardsAreSame ? predictedCardsInHand : actualCardsInHand;
  const programRegisters = cardsAreSame
    ? predictedProgramRegisters
    : actualProgramRegisters;

  const fullyProgrammed = canSubmitProgram(
    playerId,
    gameState,
    programRegisters
  ).canPerform;

  useEffect(() => {
    if (!cardsAreSame || timestampIsNewer) {
      setPredictedCardsInHand(actualCardsInHand);
      setPredictedProgramRegisters(actualProgramRegisters);
      if (actualTimestamp) {
        setTimestamp(actualTimestamp);
      }
    }
  }, [cardsAreSame, timestampIsNewer]);

  useEffect(() => {
    if (showTimer) {
      if (!timeoutRef.current) {
        timerSound.volume = 0.25;
        timeoutRef.current = setTimeout(() => {
          timerSound.play();
        }, (actualTimerSeconds - timerSound.duration) * 1000);
      }
    } else {
      timerSound.pause();
      timerSound.currentTime = 0;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = null;
    }

    return () => {
      timerSound.pause();
      timerSound.currentTime = 0;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = null;
    };
  }, [showTimer]);

  useEffect(() => {
    if (selectedCardId !== null && selectedRegisterIndex !== null) {
      const payload = setOneRegister({
        cardId: selectedCardId,
        registerIndex: selectedRegisterIndex,
        cardsInHand,
        programRegisters,
        robot: robots.find((r) => r.playerId === playerId)!,
        finishedProgrammingPlayers,
      });

      if (payload) {
        sendViaWebSocket({
          playerId,
          password: playerPassword,
          gameId: id,
          type: "action",
          action: {
            type: "set-many-registers",
            playerId,
            ...payload,
          },
        });
        setPredictedCardsInHand(payload.cardsInHand);
        setPredictedProgramRegisters(payload.programRegisters);
        setTimestamp(payload.setRegisterTimestamp);
      } else {
        setSelectedCardId(null);
      }
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
        disabled={
          !fullyProgrammed ||
          youFinishedProgramming ||
          timestamp !== actualTimestamp
        }
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
        {programRegisters.length} Set){" "}
        {timestamp !== actualTimestamp && <span> - Saving...</span>}
      </Heading>
      <StyledProgramRegisters
        cardWidth={6}
        isLoading={isLoading}
        lockedRegisters={
          youFinishedProgramming ? [0, 1, 2, 3, 4] : robot.lockedRegisters
        }
        gameData={gameData}
        predictedProgramRegisters={programRegisters}
        handleRegisterSelect={(registerIndex) => {
          if (isLoading) {
            return;
          }
          if (
            selectedRegisterIndex === registerIndex &&
            programRegisters[registerIndex] !== null
          ) {
            const payload = setOneRegister({
              cardId: selectedCardId,
              registerIndex: selectedRegisterIndex,
              cardsInHand,
              programRegisters,
              robot: robots.find((r) => r.playerId === playerId)!,
              finishedProgrammingPlayers,
            });

            if (payload) {
              sendViaWebSocket({
                playerId,
                password: playerPassword,
                gameId: id,
                type: "action",
                action: {
                  type: "set-many-registers",
                  playerId,
                  ...payload,
                },
              });
              setPredictedCardsInHand(payload.cardsInHand);
              setPredictedProgramRegisters(payload.programRegisters);
              setTimestamp(payload.setRegisterTimestamp);
            }
            return;
          }
          setSelectedRegisterIndex(registerIndex);
        }}
        chosenRegister={selectedRegisterIndex}
      />
      {!youFinishedProgramming && (
        <>
          <Heading>
            <span>Program Cards (Max {9 - robot.damagePoints})</span>
            {showTimer && (
              <TimerOuterBar>
                <TimerInnerBar
                  timerDuration={actualTimerSeconds}
                ></TimerInnerBar>
                <TimerText>Hurry Up!</TimerText>
              </TimerOuterBar>
            )}
          </Heading>
          <StyledCardsInHand
            cardWidth={5}
            isLoading={isLoading}
            gameData={gameData}
            predictedCardsInHand={cardsInHand}
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
