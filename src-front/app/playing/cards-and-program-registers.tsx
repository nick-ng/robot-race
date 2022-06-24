import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { PlayerGameData, MainGameState } from "../../../dist-common/game-types";

import CardsInHand from "./cards-in-hand";
import ProgramRegisters from "./program-registers";

interface CardsAndProgramRegistersProps {
  gameData: PlayerGameData;
  handleSettingProgramRegister: (
    cardId: string | null,
    registerIndex: number
  ) => void;
}

const StyledCardsAndProgramRegisters = styled.div``;

export default function CardsAndProgramRegisters({
  gameData,
  handleSettingProgramRegister,
}: CardsAndProgramRegistersProps) {
  const { yourSecrets } = gameData;
  const { cardsInHand, programRegisters } = yourSecrets;

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedRegisterIndex, setSelectedRegisterIndex] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCardId !== null && selectedRegisterIndex !== null) {
      setIsLoading(true);
      handleSettingProgramRegister(selectedCardId, selectedRegisterIndex);
    }
  }, [selectedCardId, selectedRegisterIndex]);

  useEffect(() => {
    setIsLoading(false);
    setSelectedCardId(null);
    setSelectedRegisterIndex(null);
  }, [cardsInHand.join(","), programRegisters.join(",")]);

  return (
    <StyledCardsAndProgramRegisters>
      <ProgramRegisters
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
            handleSettingProgramRegister(null, selectedRegisterIndex);
            return;
          }
          setSelectedRegisterIndex(registerIndex);
        }}
        chosenRegister={selectedRegisterIndex}
      />
      <CardsInHand
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
