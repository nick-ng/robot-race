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

const SliderCell = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    margin-left: 1em;
  }
`;

interface GameSettingsProps {
  gameData: PlayerGameData;
}

export default function GameSettings({ gameData }: GameSettingsProps) {
  const { gameSettings } = gameData;
  const [timerSeconds, setTimerSeconds] = useState(gameSettings.timerSeconds);

  return (
    <StyledGameSettings>
      <h3>Game Settings</h3>
      <table>
        <tbody>
          <tr>
            <td>Timer Start</td>
            <td>
              <select>
                <option value="first">
                  After the first player submits their program
                </option>
                <option value="penultimate">
                  When only one player hasn't submitted their program
                </option>
                <option value="never">Don't use a timer</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Timer Duration</td>
            <SliderCell>
              <DebouncedRange
                min={10}
                max={180}
                value={gameSettings.timerSeconds}
                onDebouncedChange={(value) => {
                  console.log("Timer Duration", value);
                }}
                onChange={(value) => {
                  setTimerSeconds(value);
                }}
              />{" "}
              <span>{timerSeconds} seconds</span>
              {gameSettings.timerSeconds !== timerSeconds && (
                <span>Loading...</span>
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
