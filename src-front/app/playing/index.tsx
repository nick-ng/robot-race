import React from "react";
import styled from "styled-components";

import { PlayerGameData, PlayerDetails } from "../../../dist-common/game-types";
import { ActionIncomingMessageObject } from "../../../dist-common/game-action-types";

import Map from "./map";
import PlayerDisplay from "./player-display";
import CardsAndProgramRegisters from "./cards-and-program-registers";
import Instructions from "./instructions";
import GameOver from "./game-over";

interface PlayingProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  sendViaWebSocket: (messageObject: ActionIncomingMessageObject) => void;
}

const StyledPlaying = styled.div``;

const StyledInstructions = styled(Instructions)`
  margin-top: 0.5em;
`;

const Heading = styled.h1`
  margin-top: 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const DisplayArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-shrink: 0;
`;

const ControlsArea = styled.div`
  flex-basis: 30vw;
  flex-grow: 0;
  flex-shrink: 0;
`;

export default function Playing({
  gameData,
  playerDetails,
  sendViaWebSocket,
}: PlayingProps) {
  const { shortId, gameState } = gameData;

  return (
    <StyledPlaying>
      <Row>
        <div>Game ID: {shortId}</div>
      </Row>
      <Row>
        <DisplayArea>
          <Map gameData={gameData} playerDetails={playerDetails} />
          <PlayerDisplay gameData={gameData} playerDetails={playerDetails} />
        </DisplayArea>
        {gameState.state === "main" && (
          <>
            <ControlsArea>
              <Heading>Robot Race</Heading>
              <CardsAndProgramRegisters
                gameData={gameData}
                playerDetails={playerDetails}
                sendViaWebSocket={sendViaWebSocket}
              />
              <StyledInstructions
                gameData={gameData}
                playerDetails={playerDetails}
              />
            </ControlsArea>
          </>
        )}
        {gameState.state === "over" && (
          <GameOver gameData={gameData} playerDetails={playerDetails} />
        )}
      </Row>
    </StyledPlaying>
  );
}
