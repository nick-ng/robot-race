import React from "react";
import styled from "styled-components";

import { PlayerGameData, MainGameState } from "../../../dist-common/game-types";

import ProgramCard from "./program-card";

interface ProgramRegistersProps {
  gameData: PlayerGameData;
  handleRegisterSelect: (registerIndex: number) => void;
  isLoading?: boolean;
  chosenRegister?: number | null;
  cardWidth?: number;
  className?: string;
}

const StyledProgramRegisters = styled.div``;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function ProgramRegisters({
  gameData,
  handleRegisterSelect,
  isLoading,
  chosenRegister,
  cardWidth,
  className,
}: ProgramRegistersProps) {
  const { yourSecrets, gameState } = gameData;
  const { programRegisters } = yourSecrets;
  const { cardMap } = gameState as MainGameState;

  return (
    <StyledProgramRegisters className={className}>
      <Cards>
        {programRegisters.map((register, i) => {
          if (register) {
            const card = cardMap[register];
            return (
              <ProgramCard
                cardWidth={cardWidth}
                isLoading={isLoading || false}
                key={`programed-register-${register}`}
                clickHandler={() => {
                  handleRegisterSelect(i);
                }}
                card={card}
                chosen={chosenRegister === i || false}
              />
            );
          }

          return (
            <ProgramCard
              cardWidth={cardWidth}
              isLoading={isLoading || false}
              key={`blank-program-register-${i}`}
              clickHandler={() => {
                handleRegisterSelect(i);
              }}
              text={[`Register ${i + 1}`, "Empty"]}
              chosen={chosenRegister === i || false}
            />
          );
        })}
      </Cards>
    </StyledProgramRegisters>
  );
}
