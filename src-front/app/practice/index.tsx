import React from "react";
import styled from "styled-components";

import { usePracticeGameData } from "../../hooks/use-practice-game-data";
import { PLAYER_UUID } from "../../hooks/default-game-data";

import Playing from "../playing";

const StyledPractice = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Practice() {
  const { gameData, fullGameData, sendViaWebSocket } =
    usePracticeGameData(PLAYER_UUID);

  return (
    <StyledPractice>
      <Playing
        playerDetails={{
          playerId: PLAYER_UUID,
          playerPassword: PLAYER_UUID,
          playerName: "You",
        }}
        gameData={gameData}
        sendViaWebSocket={sendViaWebSocket}
      />
      {process.env.NODE_ENV === "development" && (
        <pre>{JSON.stringify(fullGameData, null, "  ")}</pre>
      )}
    </StyledPractice>
  );
}
