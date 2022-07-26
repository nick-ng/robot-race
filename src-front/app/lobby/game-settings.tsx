import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import type { PlayerGameData, PlayerDetails } from "dist-common/game-types";

import DebouncedRange from "./debounced-range";

declare const API_ORIGIN: string;

const StyledGameSettings = styled.div`
  table {
    border-collapse: collapse;

    td {
      padding: 0.5em;
    }
  }
`;

const TimerStartSelect = styled.select`
  &:disabled {
    cursor: wait;
  }
`;

const SliderCell = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    margin-left: 1em;
  }
`;

const SavingText = styled.span`
  margin-left: 1em;
`;

interface GameSettingsProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

export default function GameSettings({
  gameData,
  playerDetails,
}: GameSettingsProps) {
  const { gameSettings } = gameData;
  const [timerSeconds, setTimerSeconds] = useState(gameSettings.timerSeconds);
  const [timerStartLoading, setTimerStartLoading] = useState(false);

  return (
    <StyledGameSettings>
      <h3>Game Settings</h3>
      <table>
        <tbody>
          <tr>
            <td>Timer Start</td>
            <td>
              <TimerStartSelect
                disabled={timerStartLoading}
                value={gameSettings.timerStart}
                onChange={async (e) => {
                  setTimerStartLoading(true);
                  await fetch(`${API_ORIGIN}/api/game/${gameData.id}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                      "x-player-id": playerDetails.playerId,
                      "x-player-password": playerDetails.playerPassword,
                    },
                    body: JSON.stringify({
                      action: "game-settings",
                      gameSettings: { timerStart: e.target.value },
                    }),
                  });
                  setTimerStartLoading(false);
                }}
              >
                <option value="first">
                  After the first player submits their program
                </option>
                <option value="penultimate">
                  When only one player hasn't submitted their program
                </option>
                <option value="never">Don't use a timer</option>
              </TimerStartSelect>
              {timerStartLoading && <SavingText>Saving...</SavingText>}
            </td>
          </tr>
          <tr>
            <td>Timer Duration</td>
            <SliderCell>
              <DebouncedRange
                min={10}
                max={180}
                value={gameSettings.timerSeconds}
                onChangeDebounced={async (value) => {
                  fetch(`${API_ORIGIN}/api/game/${gameData.id}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                      "x-player-id": playerDetails.playerId,
                      "x-player-password": playerDetails.playerPassword,
                    },
                    body: JSON.stringify({
                      action: "game-settings",
                      gameSettings: { timerSeconds: value },
                    }),
                  });
                }}
                onChange={(value) => {
                  setTimerSeconds(value);
                }}
              />{" "}
              <span>{timerSeconds} seconds</span>
              {gameSettings.timerSeconds !== timerSeconds && (
                <SavingText>Saving...</SavingText>
              )}
            </SliderCell>
          </tr>
          <tr>
            <td>Animation Speed</td>
            <td>Soon</td>
          </tr>
        </tbody>
      </table>
    </StyledGameSettings>
  );
}
