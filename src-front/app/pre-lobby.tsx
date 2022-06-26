import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { GameData, PlayerDetails } from "../../dist-common/game-types";

declare const API_ORIGIN: string;

interface PreLobbyProps {
  playerDetails: PlayerDetails;
}

const StyledPreLobby = styled.div``;

const HostGameButton = styled.button`
  margin-bottom: 1em;
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
        onClick={async () => {
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

          if (message.toUpperCase() === "OK") {
            navigate(`/${gameData.id}`);
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
            navigate(`/${tempGameId}`);
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
            navigate(`/${resText}`);
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
        <button disabled={loading}>Join Lobby</button>
      </Form>
      <p>{errorMessage}</p>
      <p>
        All your friends asleep, too busy for you, or you don't have any? Try{" "}
        <Link to="/practice">Practice Mode</Link>
      </p>
    </StyledPreLobby>
  );
}
