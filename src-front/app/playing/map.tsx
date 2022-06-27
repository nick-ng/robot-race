import React from "react";
import styled from "styled-components";

import {
  FlagMapItem,
  PlayerDetails,
  PlayerGameData,
} from "../../../dist-common/game-types";

import { getFlagEmoji } from "../utils";
import Robots from "./robots";

interface MapProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const MapCellToolTip = styled.div`
  display: none;
  position: absolute;
  border: 1px solid grey;
  background-color: black;
  top: 0;
`;

const MapCell = styled.td`
  position: relative;
  &:hover ${MapCellToolTip} {
    display: block;
  }
`;

const StyledMap = styled.div<{ cellSize: number }>`
  position: relative;

  table {
    border-collapse: collapse;

    ${MapCell} {
      box-sizing: border-box;
      border: 1px solid grey;
      width: ${({ cellSize }) => cellSize}vw;
      height: ${({ cellSize }) => cellSize}vw;
      font-size: ${({ cellSize }) => cellSize * 0.28}vw;
      text-align: center;

      ${MapCellToolTip} {
        left: ${({ cellSize }) => cellSize * 1.05}vw;
      }
    }
  }
`;

export default function Map({ gameData, playerDetails }: MapProps) {
  const { gameSettings } = gameData;
  const { map } = gameSettings;

  return (
    <StyledMap cellSize={2.8}>
      <table>
        <tbody>
          {new Array(map.height).fill(null).map((_, y) => (
            <tr key={`map-row-${y}`}>
              {new Array(map.width).fill(null).map((_, x) => {
                const cellItems = map.items.filter(
                  (mi) => mi.x === x && mi.y === y
                );
                const flag = cellItems.find(
                  (a) => a.type === "flag"
                ) as FlagMapItem;
                return (
                  <MapCell key={`map-item-${x}-${y}`}>
                    <MapCellToolTip>{`${x},${y}`}</MapCellToolTip>
                    {flag ? `${getFlagEmoji()}${flag.number}` : null}
                  </MapCell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Robots gameData={gameData} playerDetails={playerDetails} />
    </StyledMap>
  );
}
