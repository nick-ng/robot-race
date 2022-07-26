import React, { useState } from "react";
import styled from "styled-components";
import QRCode from "react-qr-code";

import type { PlayerGameData, PlayerDetails } from "dist-common/game-types";

import GameSettings from "./game-settings";

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

const Column = styled.div``;

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

export default function Lobby({ gameData, playerDetails }: LobbyProps) {
  const [loading, setLoading] = useState(false);

  const { shortId, players, maxPlayers, host } = gameData;

  const canJoinGame =
    !players.map((a) => a.id).includes(playerDetails.playerId) && // Not already in the game
    players.length < maxPlayers; // Game has room
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
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </Column>
      <Column>
        <GameSettings gameData={gameData} />
      </Column>
    </StyledLobby>
  );
}
