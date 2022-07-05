import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { GameData, PlayerDetails } from "dist-common/game-types";

declare const API_ORIGIN: string;

interface PreLobbyProps {
  playerDetails: PlayerDetails;
}

const StyledPreLobby = styled.div`
  li {
    margin: 0.5em 0;
  }
`;

const HostGameButton = styled.button<{ isLoading: boolean }>`
  margin-bottom: 1em;
  cursor: ${({ isLoading }) => (isLoading ? "wait" : "pointer")};
`;

const JoinGameButton = styled.button<{ isLoading: boolean }>`
  cursor: ${({ isLoading }) => (isLoading ? "wait" : "pointer")};
`;

const Form = styled.form`
  label,
  input,
  button {
    display: block;
  }
`;

export default function PreLobby({ playerDetails }: PreLobbyProps) {
  const [tempGameId, setTempGameId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <StyledPreLobby>
      <HostGameButton
        isLoading={loading}
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const res = await fetch(`${API_ORIGIN}/api/game`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "x-player-id": playerDetails.playerId,
              "x-player-password": playerDetails.playerPassword,
            },
            body: JSON.stringify({
              playerName: playerDetails.playerName,
            }),
          });

          const { message, gameData } = (await res.json()) as {
            message: string;
            gameData: GameData;
          };

          setLoading(false);

          if (message.toUpperCase() === "OK") {
            navigate(`/game/${gameData.id}`);
          }
        }}
      >
        Host Game
      </HostGameButton>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();

          const trimmedId = tempGameId.replaceAll(/[^a-z0-9\-]/g, "");
          if (trimmedId.length === 36) {
            navigate(`/game/${tempGameId}`);
            return;
          }

          if (!trimmedId) {
            setErrorMessage(`You need to enter a game ID before joining.`);
            return;
          }

          setLoading(true);
          try {
            const res = await fetch(
              `${API_ORIGIN}/api/game/short-id/${trimmedId}`
            );

            if ([400, 404].includes(res.status)) {
              setErrorMessage(`Game ${trimmedId} not found.`);
              setLoading(false);
              return;
            }

            const resText = await res.text();
            navigate(`/game/${resText}`);
            setLoading(false);
          } catch (e) {
            console.error(
              `Error when GET from ${API_ORIGIN}/api/game/short-id/${trimmedId}`,
              e
            );
          }
        }}
      >
        <label>Enter a game ID</label>
        <input
          type="text"
          value={tempGameId}
          onChange={(e) => {
            setTempGameId(e.target.value);
          }}
        />
        <JoinGameButton isLoading={loading} disabled={loading}>
          Join Lobby
        </JoinGameButton>
      </Form>
      <p>{errorMessage}</p>
      <h3>Missions</h3>
      <ul>
        <li>
          <Link to="/mission/1-movement">1: Movement</Link>
        </li>
        <li>
          <Link to="/mission/2-movement">2: More Movement</Link>
        </li>
        <li>
          <Link to="/mission/3-turns">3: Turns</Link>
        </li>
        <li>
          <Link to="/mission/4-walls">4: Walls</Link>
        </li>
      </ul>
      <h3>Other Stuff</h3>
      <ul>
        <li>
          <Link to="/mission/free-practice">Free Practice</Link>
        </li>
        <li>
          <Link to="/editor">Map Editor</Link>
        </li>
      </ul>
    </StyledPreLobby>
  );
}
