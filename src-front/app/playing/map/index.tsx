import React from "react";
import styled from "styled-components";

import {
  FlagMapItem,
  PlayerDetails,
  PlayerGameData,
} from "../../../../dist-common/game-types";

import Robots from "../robots";

import { getFlagText, getFlagToolTip } from "./flag";
import { getWallStyles, getWallToolTip } from "./wall";
import { getPitStyles, getPitToolTip } from "./pit";

interface MapProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

const MapCellToolTip = styled.div`
  z-index: 10;
  display: none;
  position: absolute;
  border: 1px solid #808080;
  background-color: #000000;
  top: 0;
  padding: 0.5em;
  pointer-events: none;
  text-align: left;

  p {
    margin: 0;
    width: max-content;
  }

  p + p {
    margin-top: 0.5em;
  }
`;

const MapCell = styled.td`
  position: relative;
  box-sizing: border-box;
  border: 1px dashed #808080;
  text-align: center;

  &:focus {
    outline: 1px solid #008000;
  }

  &:focus ${MapCellToolTip} {
    display: block;
  }
`;

const MapCellItem = styled.span`
  pointer-events: none;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledMap = styled.div<{ cellSize: number }>`
  position: relative;

  table {
    border-collapse: collapse;
    margin-bottom: 0.5em;

    tr {
      background-color: #2f2f2f;
    }

    ${MapCell} {
      width: ${({ cellSize }) => cellSize}vw;
      height: ${({ cellSize }) => cellSize}vw;
      font-size: ${({ cellSize }) => cellSize * 0.28}vw;

      ${MapCellToolTip} {
        left: ${({ cellSize }) => cellSize * 1.1}vw;
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

                const texts = [getFlagText(cellItems)].map((text) => (
                  <MapCellItem key={text}>{text}</MapCellItem>
                ));

                const styles = {
                  ...getWallStyles(cellItems),
                  ...getPitStyles(cellItems),
                };

                const toolTipElements = [
                  ...new Set([
                    getPitToolTip(cellItems),
                    getFlagToolTip(cellItems),
                    getWallToolTip(map.items, x, y),
                  ]),
                  `${x},${y}`,
                ]
                  .filter((a) => a)
                  .map((text) => <p key={text}>{text}</p>);

                return (
                  <MapCell
                    key={`map-item-${x}-${y}`}
                    style={styles}
                    tabIndex={0}
                  >
                    <MapCellToolTip>{toolTipElements}</MapCellToolTip>
                    {texts}
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
