import React from "react";
import styled from "styled-components";

import { ProgramCard } from "dist-common/game-types";

import { useOptions } from "../../hooks/options-context";

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
  isLocked?: boolean;
}>`
  padding: ${({ cardWidth }) => cardWidth * 0.05}vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-style: ${({ chosen, isLocked }) => {
    if (isLocked) {
      return "none";
    }
    if (chosen) {
      return "inset";
    }
    return "outset";
  }};
  width: ${({ cardWidth }) => cardWidth}vw;
  height: ${({ cardWidth }) => cardWidth * 1.4}vw;
  font-size: ${({ cardWidth }) => cardWidth * 0.12}vw;
  background-color: ${({ chosen, isLocked }) => {
    if (isLocked) {
      return "#000000";
    }
    if (chosen) {
      return "#777777";
    }
    return "#dcdcdc";
  }};
  color: ${({ isLocked }) => (isLocked ? "#ffffff" : "#000000")};
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

interface BaseProgramCardProps {
  cardWidth?: number;
  isLoading?: boolean;
  chosen?: boolean;
  isLocked?: boolean;
  clickHandler: () => void;
}

export default function ProgramCard({
  card,
  text,
  cardWidth,
  isLoading,
  chosen,
  isLocked,
  clickHandler,
}: ProgramCardProps) {
  const {
    options: { smallerPriorityFirst },
  } = useOptions();
  if (card) {
    const cardImagePath = IMAGE_MAP[card.action];
    return (
      <StyledProgramCard
        isLoading={isLoading || false}
        isLocked={isLocked}
        chosen={chosen || false}
        cardWidth={cardWidth || 9}
        onClick={() => {
          if (isLocked) {
            return;
          }
          clickHandler();
        }}
      >
        <div>
          Priority {smallerPriorityFirst ? 85 - card.priority : card.priority}
        </div>
        <img src={`/${cardImagePath}`} />
        <div>{card.action}</div>
      </StyledProgramCard>
    );
  }

  if (text) {
    return (
      <StyledProgramCard
        isLoading={isLoading}
        isLocked={isLocked}
        chosen={chosen}
        cardWidth={cardWidth || 9}
        onClick={() => {
          if (isLocked) {
            return;
          }
          clickHandler();
        }}
      >
        {text.map((s) => (
          <Text key={s}>{s}</Text>
        ))}
      </StyledProgramCard>
    );
  }

  return null;
}
