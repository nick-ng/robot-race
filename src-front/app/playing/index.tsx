import React from "react";
import styled from "styled-components";

import { PlayerGameData, PlayerDetails } from "dist-common/game-types";
import { ActionIncomingMessageObject } from "dist-common/game-action-types";

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

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
  }
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

const MapLeftSpacer = styled.div`
  width: 1.5vw;
  writing-mode: vertical-rl;
  transform: rotate(0.5turn);
  padding: 0 0.5em 0.5em;
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
        <DisplayArea>
          <MapLeftSpacer>
            Click on a map square to see what's on it
          </MapLeftSpacer>
          <Map
            gameData={gameData}
            playerDetails={playerDetails}
            sendViaWebSocket={sendViaWebSocket}
          />
          <PlayerDisplay gameData={gameData} playerDetails={playerDetails} />
        </DisplayArea>
        {gameState.state === "main" && (
          <>
            <ControlsArea>
              <Heading>
                <h1>Robot Race</h1>
                <div>Game ID: {shortId}</div>
              </Heading>
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
