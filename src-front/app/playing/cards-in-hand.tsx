import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { PlayerGameData } from "../../../dist-common/game-types";

interface CardsInHandProps {
  gameData: PlayerGameData;
  handleCardChoice: (cardId: string) => void;
  cardWidth?: number;
}

const Container = styled.div``;

const Cards = styled.div``;

const Card = styled.button<{
  chosen?: boolean;
  cardWidth: number;
  showLoadingStyle?: boolean;
}>`
  display: inline-block;
  margin: 1px;
  border: ${({ cardWidth }) => cardWidth * 0.05}vw
    ${(props) => (props.chosen ? "inset" : "outset")} black;
  width: ${(props) => props.cardWidth}vw;
  height: ${(props) => props.cardWidth * 1.4}vw;
  font-size: ${(props) => props.cardWidth * 0.3}vw;
  background-color: ${(props) => (props.chosen ? "#777777" : "#dddddd")};

  cursor: ${({ showLoadingStyle }) => (showLoadingStyle ? "wait" : "pointer")};
`;

export default function CardsInHand({
  gameData,
  handleCardChoice,
  cardWidth,
}: CardsInHandProps) {
  const { gameState, yourSecrets } = gameData;
  const { cardsInHand, chosenCard } = yourSecrets;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [chosenCard, cardsInHand?.join("-")]);

  if (gameState.state !== "main" || !cardsInHand) {
    return <div>Something Went Wrong</div>;
  }

  const { cardMap } = gameState;

  return (
    <Container>
      <Cards>
        {cardsInHand.map((cardId) => (
          <Card
            showLoadingStyle={loading}
            cardWidth={cardWidth || 10}
            key={cardId}
            chosen={chosenCard === cardId}
            onClick={() => {
              if (chosenCard === cardId) {
                return;
              }
              setLoading(true);
              handleCardChoice(cardId);
            }}
          >
            {cardMap[cardId]}
          </Card>
        ))}
      </Cards>
    </Container>
  );
}
