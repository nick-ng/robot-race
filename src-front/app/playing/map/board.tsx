import React from "react";
import styled from "styled-components";

import type { Map, MapItemNoId, Robot } from "dist-common/game-types";

import Dock from "./dock";
import { getFlagText, getFlagToolTip } from "./flag";
import { getWallStyles, getWallToolTip } from "./wall";
import { getPitStyles, getPitToolTip } from "./pit";
import Repair, { getRepairToolTip } from "./repair";
import StraightConveyor, {
  getStraightConveyorToolTip,
} from "./straight-conveyor";
import CurvedConveyor, { getCurvedConveyorToolTip } from "./curved-conveyor";
import Gear, { getGearToolTip } from "./gear";
import Laser, { getLaserToolTip } from "./laser";

export const MapCellToolTip = styled.div`
  z-index: 15;
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

export const MapCell = styled.td`
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

export const MapCellItem = styled.span`
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

export const getAllElements = (
  cellItems: MapItemNoId[],
  allItems: MapItemNoId[],
  robots: Robot[]
) =>
  [getFlagText(cellItems)]
    .filter((a) => a)
    .map((text) => <MapCellItem key={text}>{text}</MapCellItem>)
    .concat([
      <Dock key="dock" cellItems={cellItems} />,
      <Repair key="repair" cellItems={cellItems} />,
      <StraightConveyor key="straight-conveyor" cellItems={cellItems} />,
      <CurvedConveyor key="curved-conveyor" cellItems={cellItems} />,
      <Gear key="gear" cellItems={cellItems} />,
      <Laser
        key="laser"
        cellItems={cellItems}
        allItems={allItems}
        robots={robots}
      />,
    ]);

export const getAllStyles = (cellItems: MapItemNoId[]) => ({
  ...getWallStyles(cellItems),
  ...getPitStyles(cellItems),
});

interface BoardProps {
  map: Omit<Map, "items"> & { items: MapItemNoId[] };
  cellSize: number;
  maxDockBayDisplay: number;
  robots: Robot[];
}

export const StyledBoard = styled.table<{ cellSize: number }>`
  border-collapse: collapse;

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
`;

export default function Board({
  map,
  cellSize,
  maxDockBayDisplay,
  robots,
}: BoardProps) {
  return (
    <StyledBoard cellSize={cellSize}>
      <tbody>
        {new Array(map.height).fill(null).map((_, y) => (
          <tr key={`map-row-${y}`}>
            {new Array(map.width).fill(null).map((_, x) => {
              const cellItems = map.items.filter(
                (mi) => mi.x === x && mi.y === y
              );

              const elements = getAllElements(
                cellItems.filter((ci) => {
                  if (ci.type === "dock" && ci.number <= maxDockBayDisplay) {
                    return true;
                  }
                  return ci.type !== "dock";
                }),
                map.items,
                robots
              );
              const styles = getAllStyles(cellItems);

              const toolTipElements = [
                ...new Set([
                  getPitToolTip(cellItems),
                  getFlagToolTip(cellItems),
                  getRepairToolTip(cellItems),
                  getStraightConveyorToolTip(cellItems),
                  getCurvedConveyorToolTip(cellItems),
                  getGearToolTip(cellItems),
                  getLaserToolTip(cellItems),
                  getWallToolTip(map.items, x, y),
                ]),
                `${x},${y}`,
              ]
                .filter((a) => a)
                .map((text) => <p key={text}>{text}</p>);

              return (
                <MapCell key={`map-item-${x}-${y}`} style={styles} tabIndex={0}>
                  <MapCellToolTip>{toolTipElements}</MapCellToolTip>
                  {elements}
                </MapCell>
              );
            })}
          </tr>
        ))}
      </tbody>
    </StyledBoard>
  );
}
