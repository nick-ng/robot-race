import React from "react";
import styled from "styled-components";

import { PlayerGameData, MainGameState } from "../../../dist-common/game-types";

import ProgramCard from "./program-card";

interface CardsInHandProps {
  gameData: PlayerGameData;
  handleCardChoice: (cardId: string) => void;
  cardWidth?: number;
  isLoading?: boolean;
  chosenCard?: string | null;
}

const StyledCardsInHand = styled.div``;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function CardsInHand({
  gameData,
  handleCardChoice,
  isLoading,
  chosenCard,
}: CardsInHandProps) {
  const { gameState, yourSecrets } = gameData;
  const { cardsInHand } = yourSecrets;
  const { cardMap } = gameState as MainGameState;

  return (
    <StyledCardsInHand>
      <Cards>
        {cardsInHand.map((cardId) => (
          <ProgramCard
            card={cardMap[cardId]}
            isLoading={isLoading || false}
            key={cardId}
            chosen={chosenCard === cardId || false}
            clickHandler={() => {
              handleCardChoice(cardId);
            }}
          />
        ))}
      </Cards>
    </StyledCardsInHand>
  );
}
