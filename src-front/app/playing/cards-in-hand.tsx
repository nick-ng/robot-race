import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { PlayerGameData } from "../../../dist-common/game-types";

import ProgramCard from "./program-card";

interface CardsInHandProps {
  gameData: PlayerGameData;
  handleCardChoice: (cardId: string) => void;
  cardWidth?: number;
}

const StyledCardsInHand = styled.div``;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
`;

const Card = styled.button<{
  chosen?: boolean;
  cardWidth: number;
  showLoadingStyle?: boolean;
}>`
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  border: ${({ cardWidth }) => cardWidth * 0.05}vw
    ${(props) => (props.chosen ? "inset" : "outset")} black;
  width: ${(props) => props.cardWidth}vw;
  height: ${(props) => props.cardWidth * 1.4}vw;
  font-size: 12pt;
  background-color: ${(props) => (props.chosen ? "#777777" : "#dddddd")};

  cursor: ${({ showLoadingStyle }) => (showLoadingStyle ? "wait" : "pointer")};

  img {
    width: 100%;
    object-fit: contain;
    margin: 3px 0;
  }
`;

export default function CardsInHand({
  gameData,
  handleCardChoice,
  cardWidth,
}: CardsInHandProps) {
  const { gameState, yourSecrets } = gameData;
  const { cardsInHand, programRegisters } = yourSecrets;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [programRegisters, cardsInHand?.join("-")]);

  if (gameState.state !== "main" || !cardsInHand) {
    return <div>Something Went Wrong</div>;
  }

  const { cardMap } = gameState;

  return (
    <StyledCardsInHand>
      <Cards>
        {cardsInHand.map((cardId) => (
          <ProgramCard
            card={cardMap[cardId]}
            showLoadingStyle={loading}
            key={cardId}
            chosen={programRegisters.includes(cardId)}
            clickHandler={() => {
              if (programRegisters.includes(cardId)) {
                return;
              }
              // setLoading(true);
              handleCardChoice(cardId);
            }}
          />
        ))}
      </Cards>
    </StyledCardsInHand>
  );
}
