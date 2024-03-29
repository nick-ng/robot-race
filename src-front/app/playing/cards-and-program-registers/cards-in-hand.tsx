import React from "react";
import styled from "styled-components";

import type {
  PlayerGameData,
  MainGameState,
  OnePlayerSecrets,
} from "dist-common/game-types";

import ProgramCard from "./program-card";

interface CardsInHandProps {
  gameData: PlayerGameData;
  predictedCardsInHand?: OnePlayerSecrets["cardsInHand"];
  handleCardChoice: (cardId: string) => void;
  cardWidth?: number;
  isLoading?: boolean;
  chosenCard?: string | null;
  className?: string;
}

const StyledCardsInHand = styled.div``;

const Cards = styled.div<{ width: number }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: ${({ width }) => width}vw;
  flex-wrap: wrap;
`;

export default function CardsInHand({
  gameData,
  predictedCardsInHand,
  handleCardChoice,
  isLoading,
  chosenCard,
  cardWidth,
  className,
}: CardsInHandProps) {
  const { gameState, yourSecrets } = gameData;
  const { cardsInHand } = yourSecrets;
  const { cardMap } = gameState as MainGameState;

  return (
    <StyledCardsInHand className={className}>
      <Cards width={(cardWidth || 9) * 6}>
        {(predictedCardsInHand || cardsInHand)
          .sort((a, b) => cardMap[b]?.priority - cardMap[a]?.priority)
          .map((cardId) => (
            <ProgramCard
              cardWidth={cardWidth}
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
