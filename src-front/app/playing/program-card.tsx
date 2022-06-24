import React from "react";
import styled from "styled-components";

import { ProgramCard } from "../../../dist-common/game-types";

interface BaseProgramCardProps {
  isLoading?: boolean;
  chosen?: boolean;
  clickHandler: () => void;
}

type ProgramCardProps = BaseProgramCardProps &
  ({ card: ProgramCard; text?: never } | { text: string[]; card?: never });

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
  isLoading?: boolean;
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

  cursor: ${({ isLoading }) => (isLoading ? "wait" : "pointer")};

  &:active {
    border-style: inset;
  }

  img {
    width: 100%;
    object-fit: contain;
    margin: ${({ cardWidth }) => cardWidth * 0.03}vw 0;
  }
`;

const Text = styled.div`
  & + & {
    margin-top: 0.5em;
  }
`;

export default function ProgramCard({
  card,
  text,
  isLoading,
  chosen,
  clickHandler,
}: ProgramCardProps) {
  if (card) {
    const cardImagePath = IMAGE_MAP[card.action];
    return (
      <StyledProgramCard
        isLoading={isLoading || false}
        chosen={chosen || false}
        cardWidth={9}
        onClick={clickHandler}
      >
        <div>Priority {card.priority}</div>
        <img src={`/${cardImagePath}`} />
        <div>{card.action}</div>
      </StyledProgramCard>
    );
  }

  if (text) {
    return (
      <StyledProgramCard
        isLoading={isLoading}
        chosen={chosen}
        cardWidth={9}
        onClick={clickHandler}
      >
        {text.map((s) => (
          <Text key={s}>{s}</Text>
        ))}
      </StyledProgramCard>
    );
  }

  return null;
}
