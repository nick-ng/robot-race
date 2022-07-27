import React from "react";
import styled from "styled-components";

import type {
  PlayerGameData,
  MainGameState,
  OnePlayerSecrets,
} from "dist-common/game-types";

import ProgramCard from "./program-card";

interface ProgramRegistersProps {
  gameData: PlayerGameData;
  predictedProgramRegisters?: OnePlayerSecrets["programRegisters"];
  handleRegisterSelect: (registerIndex: number) => void;
  isLoading?: boolean;
  lockedRegisters: number[];
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
  predictedProgramRegisters,
  handleRegisterSelect,
  isLoading,
  lockedRegisters,
  chosenRegister,
  cardWidth,
  className,
}: ProgramRegistersProps) {
  const { gameState, yourSecrets } = gameData;
  const { programRegisters } = yourSecrets;
  const { cardMap } = gameState as MainGameState;

  return (
    <StyledProgramRegisters className={className}>
      <Cards>
        {(predictedProgramRegisters || programRegisters).map((register, i) => {
          const isLocked = lockedRegisters.includes(i);
          if (register) {
            const card = cardMap[register];
            return (
              <ProgramCard
                cardWidth={cardWidth}
                isLoading={isLoading || false}
                isLocked={isLocked}
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
              isLocked={isLocked}
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
