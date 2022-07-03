import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  DockMapItem,
  FlagMapItem,
  Map,
  MapItemNoId,
} from "dist-common/game-types";

import {
  MapCell,
  MapCellItem,
  StyledBoard,
  getAllStyles,
  getAllElements,
} from "../playing/map/board";

export const EditorToolTip = styled.div`
  z-index: 15;
  display: none;
  position: absolute;
  border: 1px solid #808080;
  background-color: #000000;
  top: 0;
  padding: 0.5em;
  pointer-events: none;
  text-align: left;
  width: max-content;
  left: 3vw;
`;

export const MapItemPreview = styled.div`
  position: absolute;
  z-index: 5;
  display: none;
  width: 2.8vw;
  height: 2.8vw;
  top: 0;
  left: 0;
  text-align: center;
`;

export const RelativeDiv = styled.div`
  position: relative;
`;

const StyledMapEditor = styled.div`
  display: flex;
  flex-direction: row;

  ${MapCell}:hover {
    outline: 1px solid #008000;
  }

  ${MapCell}:hover ${EditorToolTip}, ${MapCell}:hover ${MapItemPreview} {
    display: block;
  }
`;

const Controls = styled.div`
  margin-right: 1em;
  display: flex;
  flex-direction: column;

  button {
    margin-bottom: 0.5em;
  }
`;

const MapOutput = styled.textarea`
  margin-left: 1em;
`;

const ImportControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin-left: 1em;
`;

const wallDirectionMap = {
  up: { xd: 0, yd: -1 },
  right: { xd: 1, yd: 0 },
  down: { xd: 0, yd: 1 },
  left: { xd: -1, yd: 0 },
};

type ExtraOptions =
  | Partial<MapItemNoId>
  | { direction?: "up" | "down" | "left" | "right" };

const getExtraOptions = (
  mapItems: MapItemNoId[],
  itemType: MapItemNoId["type"]
): ExtraOptions | null => {
  let numberRange = new Array(99).fill(null).map((_, i) => i + 1);
  switch (itemType) {
    case "dock":
      numberRange = [1, 2, 3, 4, 5, 6, 7, 8];
    case "flag":
      const existingNumbers = mapItems
        .filter((mi) => mi.type === itemType)
        .map((a) => (a as DockMapItem | FlagMapItem).number);
      const freeNumbers = numberRange.filter(
        (n) => !existingNumbers.includes(n)
      );
      if (freeNumbers.length > 0) {
        return {
          number: freeNumbers[0],
        };
      }
    case "straight-conveyor":
      return {
        direction: "up",
        speed: 1,
      };
    case "wall":
      return {
        direction: "up",
      };
    case "repair":
      return {};
    default:
      return null;
  }
};

export default function MapEditor() {
  const [name, setName] = useState("Unnamed");
  const [dimensions, setDimensions] = useState({ height: 16, width: 12 });
  const [items, setItems] = useState<MapItemNoId[]>([]);
  const [extraOptions, setExtraOptions] = useState<ExtraOptions>({ number: 1 });
  const [chosenItem, setChosenItem] = useState<MapItemNoId["type"] | "erase">(
    "erase"
  );
  const [importString, setImportString] = useState("");

  useEffect(() => {
    if (chosenItem === "erase") {
      return;
    }

    const extraOptions = getExtraOptions(items, chosenItem);
    if (!extraOptions) {
      setChosenItem("erase");
      setExtraOptions({});
      return;
    }

    if (!["dock", "flag"].includes(chosenItem)) {
      return;
    }

    setExtraOptions((prev) => ({ ...prev, ...extraOptions } as ExtraOptions));
  }, [items]);

  const map: Map = {
    name,
    ...dimensions,
    items: items.map((item, id) => ({ ...item, id })),
  };

  return (
    <StyledMapEditor>
      <Controls>
        <button
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(map));
          }}
        >
          Copy
        </button>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Width</td>
              <td>
                <input
                  value={dimensions.width}
                  type="number"
                  onChange={(e) => {
                    setDimensions((prev) => ({
                      ...prev,
                      width: parseInt(e.target.value),
                    }));
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Height</td>
              <td>
                <input
                  value={dimensions.height}
                  type="number"
                  onChange={(e) => {
                    setDimensions((prev) => ({
                      ...prev,
                      height: parseInt(e.target.value),
                    }));
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Item</td>
              <td>
                <select
                  name="map-item"
                  onChange={(e) => {
                    const newItemType = e.target.value as
                      | MapItemNoId["type"]
                      | "erase";

                    if (newItemType === "erase") {
                      setChosenItem("erase");
                      return;
                    }

                    const extraOptions = getExtraOptions(items, newItemType);
                    if (extraOptions) {
                      setChosenItem(newItemType);
                      setExtraOptions(extraOptions);
                    }
                  }}
                >
                  <option value="erase">Erase</option>
                  <option value="dock">Dock Bay</option>
                  <option value="flag">Flag</option>
                  <option value="wall">Wall</option>
                  <option value="straight-conveyor">Straight Conveyor</option>
                  <option value="repair">Repair</option>
                </select>
              </td>
            </tr>
            {["wall", "straight-conveyor"].includes(chosenItem) && (
              <tr>
                <td>Direction</td>
                <td>
                  <select
                    name="direction"
                    onChange={(e) => {
                      const newDirection = e.target.value as
                        | "up"
                        | "down"
                        | "left"
                        | "right";

                      setExtraOptions((prev) => ({
                        ...prev,
                        direction: newDirection,
                      }));
                    }}
                  >
                    <option value="up">Up</option>
                    <option value="down">Down</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </td>
              </tr>
            )}
            {["straight-conveyor"].includes(chosenItem) && (
              <tr>
                <td>Speed</td>
                <td>
                  <input
                    value={(extraOptions as { speed: number }).speed}
                    type="number"
                    onChange={(e) => {
                      setExtraOptions((prev) => ({
                        ...prev,
                        speed: parseInt(e.target.value, 10),
                      }));
                    }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          disabled={items.length === 0}
          onClick={() => {
            if (items.length > 0) {
              setItems((prevItems) => prevItems.slice(0, prevItems.length - 1));
            }
          }}
        >
          Undo
        </button>
      </Controls>
      <RelativeDiv>
        <StyledBoard cellSize={2.8}>
          <tbody>
            {new Array(dimensions.height).fill(null).map((_, y) => (
              <tr key={`map-row-${y}`}>
                {new Array(dimensions.width).fill(null).map((_, x) => {
                  const cellItems = items.filter(
                    (mi) => mi.x === x && mi.y === y
                  );

                  const elements = getAllElements(cellItems);
                  const styles = getAllStyles(cellItems);

                  let chosenItemTexts = null;
                  let chosenItemStyles = {};
                  const direction = (
                    extraOptions as {
                      direction: "up" | "down" | "left" | "right";
                    }
                  ).direction;
                  const xyd = wallDirectionMap[direction];

                  if (chosenItem !== "erase") {
                    chosenItemTexts =
                      chosenItem === "dock" ? (
                        <MapCellItem
                          key={`dock-${
                            (extraOptions as Pick<DockMapItem, "number">).number
                          }`}
                        >
                          🤖
                          {(extraOptions as Pick<DockMapItem, "number">).number}
                        </MapCellItem>
                      ) : (
                        getAllElements([
                          { type: chosenItem, ...extraOptions } as MapItemNoId,
                        ])
                      );

                    let extraExtra = {};

                    if (chosenItem === "wall") {
                      extraExtra = {
                        x: 0,
                        y: 0,
                        x1: xyd.xd,
                        y1: xyd.yd,
                      };
                    }

                    chosenItemStyles = getAllStyles([
                      {
                        type: chosenItem,
                        ...extraOptions,
                        ...extraExtra,
                      } as MapItemNoId,
                    ]);
                  }

                  return (
                    <MapCell
                      key={`map-item-${x}-${y}`}
                      style={styles}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setItems((prevItems) => {
                          if (chosenItem === "erase") {
                            return prevItems.filter(
                              (mi) => !(mi.x === x && mi.y === y)
                            );
                          }

                          if (chosenItem === "wall") {
                            return prevItems.concat([
                              {
                                type: chosenItem,
                                x,
                                y,
                                x1: x + xyd.xd,
                                y1: y + xyd.yd,
                              },
                            ]);
                          }

                          return prevItems.concat([
                            {
                              type: chosenItem,
                              ...extraOptions,
                              x,
                              y,
                            } as MapItemNoId,
                          ]);
                        });
                      }}
                    >
                      <EditorToolTip>
                        {x}, {y}
                      </EditorToolTip>
                      {elements}
                      <MapItemPreview style={chosenItemStyles}>
                        {chosenItemTexts}
                      </MapItemPreview>
                    </MapCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </StyledBoard>
      </RelativeDiv>
      <MapOutput value={JSON.stringify(map, null, "  ")} onChange={() => {}} />
      <ImportControls>
        <div>Import</div>
        <input
          onChange={(e) => {
            setImportString(e.target.value);
          }}
        />
        <button
          onClick={() => {
            try {
              const importedMap = JSON.parse(importString);
              setName(importedMap.name);
              setDimensions({
                height: importedMap.height,
                width: importedMap.width,
              });
              setItems(importedMap.items);
            } catch (e) {
              setImportString("Invalid Map");
            }
          }}
        >
          Import
        </button>
      </ImportControls>
    </StyledMapEditor>
  );
}
