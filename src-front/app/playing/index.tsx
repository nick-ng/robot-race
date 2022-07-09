import React from "react";
import styled from "styled-components";

import {
  PlayerGameData,
  PlayerDetails,
  MainGameState,
} from "dist-common/game-types";
import { ActionIncomingMessageObject } from "dist-common/game-action-types";

import Map from "./map";
import PlayerDisplay from "./player-display";
import CardsAndProgramRegisters from "./cards-and-program-registers";
import RespawnMessage from "./respawn-message";
import PowerDownControl from "./power-down-controls";
import Instructions from "./instructions";
import GameOver from "./game-over";
import { getFlagEmoji } from "../utils";

const StyledPlaying = styled.div`
  flex-shrink: 0;
`;

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

const BigMessage = styled.div`
  font-size: 18pt;
  margin-bottom: 0.5em;
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

interface PlayingProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  sendViaWebSocket: (messageObject: ActionIncomingMessageObject) => void;
}

export default function Playing({
  gameData,
  playerDetails,
  sendViaWebSocket,
}: PlayingProps) {
  const { playerId } = playerDetails;
  const { shortId, gameState } = gameData;
  const { flagsTouched, robots } = gameState as MainGameState;
  const robot = robots.find((r) => r.playerId === playerId)!;

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
              <BigMessage>
                <div>
                  Next: {getFlagEmoji()}
                  {flagsTouched[playerId] + 1}
                </div>
                <div>
                  Robot Health: {10 - robot.damagePoints}/10, Lives:{" "}
                  {robot.lives}
                </div>
              </BigMessage>
              <hr />
              {robot.status === "powered-down" && (
                <BigMessage>
                  Your robot is powered down. Waiting for other players to
                  finish their turns.
                </BigMessage>
              )}
              {!robots.some((r) => r.status === "stand-by") && (
                <CardsAndProgramRegisters
                  gameData={gameData}
                  playerDetails={playerDetails}
                  sendViaWebSocket={sendViaWebSocket}
                />
              )}
              <RespawnMessage
                gameData={gameData}
                playerDetails={playerDetails}
              />
              <PowerDownControl
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
