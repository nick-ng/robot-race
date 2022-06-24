import React from "react";
import styled from "styled-components";

import { PlayerGameData, PlayerDetails } from "../../../dist-common/game-types";
import { ActionIncomingMessageObject } from "../../../dist-common/websocket-message-types";

import CardsAndProgramRegisters from "./cards-and-program-registers";

interface PlayingProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  sendViaWebSocket: (messageObject: ActionIncomingMessageObject) => void;
}

const StyledPlaying = styled.div`
  display: inline-block;
`;

export default function Playing({
  gameData,
  playerDetails,
  sendViaWebSocket,
}: PlayingProps) {
  const { shortId } = gameData;

  return (
    <StyledPlaying>
      <p>Game ID: {shortId}</p>
      <CardsAndProgramRegisters
        gameData={gameData}
        playerDetails={playerDetails}
        sendViaWebSocket={sendViaWebSocket}
      />
    </StyledPlaying>
  );
}
