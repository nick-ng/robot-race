import React, { useState, useEffect } from "react";
import styled from "styled-components";

import type {
  PlayerGameData,
  PlayerDetails,
  GameSettings,
  Map,
} from "dist-common/game-types";

import MapChooser from "./map-chooser";
import DebouncedRange from "./debounced-range";

declare const API_ORIGIN: string;

const TIMER_START = {
  never: "No timer",
  first: "After the first player",
  penultimate: "One player left",
} as const;

const StyledGameSettings = styled.div`
  table {
    border-collapse: collapse;

    td {
      padding: 0.5em;
    }
  }
`;

const GameSettingsTitle = styled.h3`
  display: inline;
  margin-right: 1em;
`;

const TimerStartSelect = styled.select``;

const SliderCell = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    margin-left: 1em;
  }
`;

const TimerSeconds = styled.div`
  display: inline-block;
  width: 6.5em;
  text-align: right;
`;

interface GameSettingsProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

export default function GameSettings({
  gameData,
  playerDetails,
}: GameSettingsProps) {
  const { gameSettings, host } = gameData;
  const { map } = gameSettings;
  const [timerSeconds, setTimerSeconds] = useState(gameSettings.timerSeconds);
  const [timerStartLoading, setTimerStartLoading] = useState(false);

  const isHost = playerDetails.playerId === host;

  useEffect(() => {
    setTimerSeconds(gameSettings.timerSeconds);
  }, [gameSettings.timerSeconds]);

  return (
    <StyledGameSettings>
      <div>
        <GameSettingsTitle>Game Settings</GameSettingsTitle>
        {(gameSettings.timerSeconds !== timerSeconds || timerStartLoading) && (
          <span>Saving...</span>
        )}
      </div>
      <table>
        <tbody>
          <tr>
            <td>Timer Start</td>
            <td>
              {isHost ? (
                <TimerStartSelect
                  disabled={!isHost || timerStartLoading}
                  value={gameSettings.timerStart}
                  onChange={async (e) => {
                    if (!isHost) {
                      return;
                    }
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
                  <option value="first">After the first player</option>
                  <option value="penultimate">One player left</option>
                  <option value="never">No timer</option>
                </TimerStartSelect>
              ) : (
                TIMER_START[gameSettings.timerStart]
              )}
            </td>
          </tr>
          <tr>
            <td>Timer Duration</td>
            {isHost ? (
              <SliderCell>
                <DebouncedRange
                  disabled={!isHost}
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
                />
                <TimerSeconds>{timerSeconds} seconds</TimerSeconds>
              </SliderCell>
            ) : (
              <td>{timerSeconds} seconds</td>
            )}
          </tr>
          {map && (
            <MapChooser
              map={map}
              isHost={isHost}
              gameId={gameData.id}
              playerDetails={playerDetails}
            />
          )}
        </tbody>
      </table>
    </StyledGameSettings>
  );
}
