import React from "react";
import styled from "styled-components";

import type {
  PlayerGameData,
  PlayerDetails,
  MainGameState,
} from "dist-common/game-types";
import type { ActionIncomingMessageObject } from "dist-common/game-action-types";

import { getFlagEmoji } from "../utils";
import { useOptions } from "../../hooks/options-context";

import Map from "./map";
import PlayerDisplay from "./player-display";
import CardsAndProgramRegisters from "./cards-and-program-registers";
import CardsAndProgramRegistersLockStep from "./cards-and-program-registers/lock-step";
import RespawnMessage from "./respawn-message";
import PowerDownControl from "./power-down-controls";
import Instructions from "./instructions";
import GameOver from "./game-over";
import getBorderStyle from "./robots/get-border-style";

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
  const { players, shortId, gameState } = gameData;
  const { flagsTouched, robots } = gameState as MainGameState;
  const robot = robots.find((r) => r.playerId === playerId)!;

  const isPlaying = players.some((p) => p.id === playerId);

  const {
    options: { colors, predictiveMode },
  } = useOptions();

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
            maxDockBayDisplay={0}
          />
          <PlayerDisplay gameData={gameData} playerDetails={playerDetails} />
        </DisplayArea>
        {isPlaying && gameState.state === "main" && (
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
                <div style={getBorderStyle(robot.design, colors)}>
                  Robot Health: {10 - robot.damagePoints}/10, Lives:{" "}
                  {robot.lives}
                </div>
              </BigMessage>
              <hr />
              {robot.status === "powered-down" && (
                <BigMessage>
                  Your robot is busy repairing itself and cannot do anything
                  else. Waiting for other players to finish their turns.
                </BigMessage>
              )}
              {!robots.some((r) => r.status === "stand-by") &&
                (predictiveMode ? (
                  <CardsAndProgramRegisters
                    gameData={gameData}
                    playerDetails={playerDetails}
                    sendViaWebSocket={sendViaWebSocket}
                  />
                ) : (
                  <CardsAndProgramRegistersLockStep
                    gameData={gameData}
                    playerDetails={playerDetails}
                    sendViaWebSocket={sendViaWebSocket}
                  />
                ))}
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
            {process.env.NODE_ENV === "development" && (
              <pre>
                {JSON.stringify(
                  {
                    ...gameData,
                    gameSettings: {
                      ...gameData.gameSettings,
                      map: { ...gameData.gameSettings.map, items: null },
                    },
                    gameState: {
                      ...gameData.gameState,
                      cardMap: null,
                      discardedCards: null,
                    },
                  },
                  null,
                  "  "
                )}
              </pre>
            )}
          </>
        )}
        {gameState.state === "over" && (
          <GameOver gameData={gameData} playerDetails={playerDetails} />
        )}
      </Row>
    </StyledPlaying>
  );
}
