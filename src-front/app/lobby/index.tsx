import React, { useState } from "react";
import styled from "styled-components";
import QRCode from "react-qr-code";

import type { PlayerGameData, PlayerDetails } from "dist-common/game-types";

import Map from "../playing/map";
import { RobotWithDesign } from "../home/robot-colors";
import GameSettings from "./game-settings";
import RobotDesignSelect from "./robot-design-select";

declare const API_ORIGIN: string;

interface LobbyProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const StyledLobby = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Column = styled.div`
  & + & {
    margin-left: 1em;
  }
`;

const SpectateText = styled.p`
  max-width: 12em;
`;

const Details = styled.details`
  margin: 1em 0;
`;

const QuiteZone = styled.div`
  background-color: #ffffff;
  padding: 16px;
  display: inline-block;
`;

const Button = styled.button`
  display: block;
  &:disabled {
    cursor: wait;
  }

  & + & {
    margin-top: 1em;
  }
`;

const PlayerItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.5em;
  margin-left: 0.5em;

  span {
    margin-left: 0.5em;
  }
`;

export default function Lobby({ gameData, playerDetails }: LobbyProps) {
  const [loading, setLoading] = useState(false);
  const [spectateClicked, setSpectateClicked] = useState(false);

  const { shortId, players, maxPlayers, host, gameState } = gameData;
  const { robots } = gameState;

  const isInGame = players.map((a) => a.id).includes(playerDetails.playerId);
  const canJoinGame = !isInGame && players.length < maxPlayers;
  const isHost = host === playerDetails.playerId;

  return (
    <StyledLobby>
      <Column>
        <h3>Game ID: {shortId}</h3>
        <Details>
          <summary>QR Code</summary>
          <QuiteZone>
            <QRCode value={location.href} />
          </QuiteZone>
        </Details>
        {isHost && (
          <Button
            onClick={() => {
              navigator.clipboard.writeText(location.href);
            }}
          >
            Copy Game Link
          </Button>
        )}
        {canJoinGame && (
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await fetch(`${API_ORIGIN}/api/game/${gameData.id}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                  "x-player-id": playerDetails.playerId,
                  "x-player-password": playerDetails.playerPassword,
                },
                body: JSON.stringify({
                  action: "join",
                  playerName: playerDetails.playerName,
                }),
              });
              setLoading(false);
            }}
          >
            Join Game
          </Button>
        )}
        {isHost && (
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await fetch(`${API_ORIGIN}/api/game/${gameData.id}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                  "x-player-id": playerDetails.playerId,
                  "x-player-password": playerDetails.playerPassword,
                },
                body: JSON.stringify({
                  action: "start",
                }),
              });
              setLoading(false);
            }}
          >
            Start Game
          </Button>
        )}
        <h2>Players In Game</h2>
        <div>
          {players.map((player) => (
            <PlayerItem key={player.id}>
              <RobotWithDesign
                bounce={player.id === playerDetails.playerId}
                design={robots.find((r) => r.playerId === player.id)?.design!}
              />
              <span>{player.name}</span>
            </PlayerItem>
          ))}
        </div>
        {isInGame && (
          <RobotDesignSelect
            gameData={gameData}
            playerDetails={playerDetails}
          />
        )}
        {!isInGame && !spectateClicked && (
          <Button
            onClick={() => {
              setSpectateClicked(true);
            }}
          >
            Spectate Game
          </Button>
        )}
        {!isInGame && spectateClicked && (
          <SpectateText>Spectating the game</SpectateText>
        )}
      </Column>
      <Column>
        <GameSettings gameData={gameData} playerDetails={playerDetails} />
      </Column>
      <Column>
        <Map
          gameData={gameData}
          playerDetails={playerDetails}
          sendViaWebSocket={() => {}}
          maxDockBayDisplay={players.length}
        />
      </Column>
    </StyledLobby>
  );
}
