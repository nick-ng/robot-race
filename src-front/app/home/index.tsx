import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import type { GameData, PlayerDetails } from "dist-common/game-types";

import Missions from "./missions";
import RobotColors from "./robot-colors";

declare const API_ORIGIN: string;

interface HomeProps {
  playerDetails: PlayerDetails;
}

const StyledHome = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Column = styled.div`
  & + & {
    margin-left: 1em;
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

export default function Home({ playerDetails }: HomeProps) {
  const [tempGameId, setTempGameId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <StyledHome>
      <Column>
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

            const trimmedId = tempGameId.replaceAll(/[^a-z0-9\-]/gi, "");
            if (trimmedId.length === 36) {
              navigate(`/game/${tempGameId}`);
              return;
            }

            if (!trimmedId) {
              setErrorMessage(`You need to enter a valid game ID.`);
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
              setTempGameId(e.target.value.toUpperCase());
            }}
          />
          <JoinGameButton isLoading={loading} disabled={loading}>
            Join Lobby
          </JoinGameButton>
        </Form>
        <p>{errorMessage}</p>
      </Column>
      <Column>
        <Missions />
      </Column>
      <Column>
        <RobotColors />
      </Column>
    </StyledHome>
  );
}
