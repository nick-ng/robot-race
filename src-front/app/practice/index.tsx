import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { PlayerGameData, GameData } from "../../../dist-common/game-types";
import { usePracticeGameData } from "../../hooks/use-practice-game-data";
import { PLAYER_UUID } from "../../hooks/default-game-data";

import CardsAndProgramRegisters from "../playing/cards-and-program-registers";

declare const API_ORIGIN: string;

const StyledPractice = styled.div``;

export default function Practice() {
  const { gameData, sendViaWebSocket } = usePracticeGameData(PLAYER_UUID);

  return (
    <StyledPractice>
      Test
      <CardsAndProgramRegisters
        gameData={gameData}
        handleSettingProgramRegister={async (cardId, registerIndex) => {
          sendViaWebSocket({
            playerId: PLAYER_UUID,
            playerPassword: PLAYER_UUID,
            gameId: gameData.id,
            type: "action",
            action: {
              type: "set-register",
              playerId: PLAYER_UUID,
              cardId,
              registerIndex,
            },
          });
        }}
      />
    </StyledPractice>
  );
}
