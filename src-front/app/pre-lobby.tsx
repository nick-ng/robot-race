import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { GameData, PlayerDetails } from "../../dist-common/game-types";

declare const API_ORIGIN: string;

interface PreLobbyProps {
  playerDetails: PlayerDetails;
}

const Container = styled.div``;

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
    <Container>
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

          setLoading(true);
          try {
            const res = await fetch(
              `${API_ORIGIN}/api/game/short-id/${trimmedId}`
            );

            if (res.status === 404) {
              setErrorMessage(`Game ${trimmedId} not found.`);
              setLoading(false);
              return;
            }

            const resText = await res.text();

            console.log("resText", resText);
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
    </Container>
  );
}
