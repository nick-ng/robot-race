import React from "react";
import styled from "styled-components";

import { ProgramCard } from "../../../dist-common/game-types";

interface ProgramCardProps {
  card: ProgramCard;
  showLoadingStyle: boolean;
  chosen: boolean;
  clickHandler: (cardId: string) => void;
}

const IMAGE_MAP = {
  "Move 1": "move-1.png",
  "Move 2": "move-2.png",
  "Move 3": "move-3.png",
  "Back Up": "back-up.png",
  "Rotate Right": "rotate-right.png",
  "Rotate Left": "rotate-left.png",
  "U-Turn": "u-turn.png",
};

const StyledProgramCard = styled.button<{
  chosen?: boolean;
  cardWidth: number;
  showLoadingStyle?: boolean;
}>`
  padding: ${({ cardWidth }) => cardWidth * 0.05}vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  border: ${({ cardWidth }) => cardWidth * 0.05}vw
    ${({ chosen }) => (chosen ? "inset" : "outset")} black;
  width: ${({ cardWidth }) => cardWidth}vw;
  height: ${({ cardWidth }) => cardWidth * 1.4}vw;
  font-size: ${({ cardWidth }) => cardWidth * 0.12}vw;
  background-color: ${({ chosen }) => (chosen ? "#777777" : "#dddddd")};

  cursor: ${({ showLoadingStyle }) => (showLoadingStyle ? "wait" : "pointer")};

  img {
    width: 100%;
    object-fit: contain;
    margin: ${({ cardWidth }) => cardWidth * 0.03}vw 0;
  }
`;

export default function ProgramCard({
  card,
  showLoadingStyle,
  chosen,
  clickHandler,
}: ProgramCardProps) {
  return (
    <StyledProgramCard
      showLoadingStyle={showLoadingStyle}
      chosen={chosen}
      cardWidth={9}
      onClick={() => {
        clickHandler(card.id);
      }}
    >
      <span>Priority {card.priority}</span>
      <img src={`/${IMAGE_MAP[card.action]}`} />
      {card.action}
    </StyledProgramCard>
  );
}
