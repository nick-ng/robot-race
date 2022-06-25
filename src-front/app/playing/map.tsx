import React from "react";
import styled from "styled-components";

import {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "../../../dist-common/game-types";

import Robots from "./robots";

interface MapProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const MapCell = styled.td``;

const StyledMap = styled.div<{ numberColumns: number; cellSize: number }>`
  position: relative;

  table {
    border-collapse: collapse;

    ${MapCell} {
      box-sizing: border-box;
      border: 1px solid grey;
      width: ${({ cellSize }) => cellSize}vw;
      height: ${({ cellSize }) => cellSize}vw;
      // font-size: ${({ cellSize }) => cellSize * 0.3}vw;
      font-size: 1.1vw;
      text-align: center;
    }
  }
`;

export default function Map({ gameData, playerDetails }: MapProps) {
  const { gameState, gameSettings } = gameData;
  const { map } = gameSettings;

  return (
    <StyledMap numberColumns={map[0]?.length || 12} cellSize={2.8}>
      <table>
        <tbody>
          {map.map((mapRow, n) => (
            <tr key={`map-row-${n}`}>
              {mapRow.map((mapCell, m) => (
                <MapCell key={`map-item-${m}-${n}`}>🤖</MapCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Robots gameData={gameData} playerDetails={playerDetails} />
    </StyledMap>
  );
}
