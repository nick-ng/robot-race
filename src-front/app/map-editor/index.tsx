import React, { useState, useEffect } from "react";
import styled from "styled-components";

import type {
  CurvedConveyorMapItem,
  DockMapItem,
  FlagMapItem,
  Map,
  MapItemNoId,
} from "dist-common/game-types";

import { mapValidator } from "dist-common/maps/map-validator";
import {
  MapCell,
  MapCellItem,
  StyledBoard,
  getAllStyles,
  getAllElements,
} from "../playing/map/board";

import MapItemSelect from "./map-item-select";
import CurvedConveyorFromOptions from "./curved-conveyor-from-options";

export const MAP_STORE = "ROBOT-RACE-MAP-STORE";
const OPPOSITE = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
} as const;
const ITEM_NAMES: {
  [Property in MapItemNoId["type"] | "erase"]?: string;
} = {
  "curved-conveyor": "Curved Conveyor",
  "straight-conveyor": "Straight Conveyor",
  dock: "Dock Bay",
};

export const MapItemChooser = styled.table`
  margin: 1em 0;
`;

export const ValidationHeadings = styled.div`
  margin-top: 1em;
`;

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

export const MapItemPreview = styled.div<{ alwaysShow?: boolean }>`
  position: absolute;
  z-index: 5;
  display: ${({ alwaysShow }) => (alwaysShow ? "block" : "none")};
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
  width: 15em;
  display: flex;
  flex-direction: column;
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

const ChosenItemDisplay = styled.div`
  background-color: #2f2f2f;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  & > div {
    position: relative;
    box-sizing: border-box;
    border: 1px dashed #808080;
    text-align: center;
    width: 2.8vw;
    height: 2.8vw;
  }
`;

const wallDirectionMap = {
  up: { xd: 0, yd: -1 },
  right: { xd: 1, yd: 0 },
  down: { xd: 0, yd: 1 },
  left: { xd: -1, yd: 0 },
};

type ExtraOptions =
  | Partial<MapItemNoId>
  | {
      direction?:
        | "up"
        | "down"
        | "left"
        | "right"
        | "clockwise"
        | "counter-clockwise";
    }
  | { tempDirection?: string };

const getExtraOptions = (
  mapItems: MapItemNoId[],
  itemType: MapItemNoId["type"]
): ExtraOptions | null => {
  let numberRange = new Array(99).fill(null).map((_, i) => i + 1);
  switch (itemType) {
    case "dock":
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
    case "curved-conveyor":
      return {
        direction: "up",
        fromDirection: ["left"],
        showStraight: false,
        speed: 1,
      };
    case "gear":
      return {
        direction: "clockwise",
      };
    case "wall":
      return {
        direction: "up",
      };
    case "laser":
      return {
        direction: "up",
        count: 1,
      };
    case "pit":
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

  let flagCounter = 1;
  let dockCounter = 1;
  const map: Map = {
    name,
    ...dimensions,
    items: items.map((item, id) => {
      const fullItem = { ...item, id };

      if (item.type === "flag") {
        return {
          ...fullItem,
          number: flagCounter++,
        };
      }

      if (item.type === "dock") {
        return {
          ...fullItem,
          number: dockCounter++,
        };
      }

      return fullItem;
    }),
  };

  let chosenItemTexts: null | JSX.Element | JSX.Element[] = null;
  let chosenItemStyles = {};
  const direction = (
    extraOptions as {
      direction: "up" | "down" | "left" | "right";
    }
  ).direction;
  const xyd = wallDirectionMap[direction];

  let extraExtra = {};

  if (chosenItem === "wall") {
    extraExtra = {
      x: 0,
      y: 0,
      x1: xyd.xd,
      y1: xyd.yd,
    };
  }

  if (["dock", "flag"].includes(chosenItem)) {
    const existingItems = items.filter((i) => i.type === chosenItem);
    extraExtra = {
      number: existingItems.length + 1,
    };
  }

  if (chosenItem !== "erase") {
    chosenItemTexts =
      chosenItem === "dock" ? (
        <MapCellItem
          key={`dock-${(extraOptions as Pick<DockMapItem, "number">).number}`}
        >
          🤖
        </MapCellItem>
      ) : (
        getAllElements(
          [
            {
              type: chosenItem,
              ...extraOptions,
              ...extraExtra,
            } as MapItemNoId,
          ],
          items,
          [],
          []
        )
      );

    chosenItemStyles = getAllStyles([
      {
        type: chosenItem,
        ...extraOptions,
        ...extraExtra,
      } as MapItemNoId,
    ]);
  }

  const chosenItemDisplayName =
    ITEM_NAMES[chosenItem] ||
    `${chosenItem.charAt(0).toUpperCase()}${chosenItem.slice(1)}`;
  const chosenItemCount = items.filter((i) => i.type === chosenItem).length;

  const { warnings, errors } = mapValidator(map);

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
  }, [items, chosenItem]);

  useEffect(() => {
    if (items.length > 5) {
      localStorage.setItem(MAP_STORE, JSON.stringify(map));
    }
  }, [items, dimensions.height, dimensions.width]);

  useEffect(() => {
    try {
      const savedMapString = localStorage.getItem(MAP_STORE) as string;
      const savedMap = JSON.parse(savedMapString) as Map;
      setItems(savedMap.items);
      setDimensions({
        height: savedMap.height,
        width: savedMap.width,
      });
      setName(savedMap.name);
    } catch (e) {
      console.error("problem loading map", e);
    }
  }, []);

  return (
    <StyledMapEditor>
      <Controls>
        <button
          onClick={() => {
            if (chosenItem === "erase") {
              if (
                !confirm(
                  "Really clear the map? The width and height will also be reset."
                )
              ) {
                return;
              }

              setItems([]);
              setDimensions({
                height: 16,
                width: 12,
              });
              return;
            }

            if (chosenItemCount > 5) {
              if (
                !confirm(
                  `Really clear ${chosenItemCount} ${chosenItemDisplayName}s`
                )
              ) {
                return;
              }
            }

            setItems(items.filter((i) => i.type !== chosenItem));
          }}
        >
          {chosenItem !== "erase"
            ? `Clear ${chosenItemCount} ${chosenItemDisplayName}${
                chosenItemCount !== 1 ? "s" : ""
              }`
            : "Clear All Map Items"}
        </button>

        <MapItemChooser>
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
                <MapItemSelect
                  value={chosenItem}
                  onChange={(newItemType) => {
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
                />
              </td>
            </tr>
            {["wall", "straight-conveyor", "curved-conveyor", "laser"].includes(
              chosenItem
            ) && (
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
            {["gear"].includes(chosenItem) && (
              <tr>
                <td>Direction</td>
                <td>
                  <select
                    name="direction"
                    onChange={(e) => {
                      const newDirection = e.target.value as
                        | "clockwise"
                        | "counter-clockwise";

                      setExtraOptions((prev) => ({
                        ...prev,
                        direction: newDirection,
                      }));
                    }}
                  >
                    <option value="clockwise">Clockwise</option>
                    <option value="counter-clockwise">Counter Clockwise</option>
                  </select>
                </td>
              </tr>
            )}
            {["straight-conveyor", "curved-conveyor"].includes(chosenItem) && (
              <tr>
                <td>Speed</td>
                <td>
                  <input
                    style={{ width: "5em" }}
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
            {["laser"].includes(chosenItem) && (
              <tr>
                <td>Count</td>
                <td>
                  <input
                    style={{ width: "5em" }}
                    value={(extraOptions as { count: number }).count}
                    type="number"
                    onChange={(e) => {
                      setExtraOptions((prev) => ({
                        ...prev,
                        count: parseInt(e.target.value, 10),
                      }));
                    }}
                  />
                </td>
              </tr>
            )}
            {["curved-conveyor"].includes(chosenItem) && (
              <tr>
                <td>From</td>
                <td>
                  <CurvedConveyorFromOptions
                    direction={
                      (extraOptions as Partial<CurvedConveyorMapItem>)
                        .direction!
                    }
                    fromDirection={
                      (extraOptions as Partial<CurvedConveyorMapItem>)
                        .fromDirection || []
                    }
                    onChange={(newFromDirection) => {
                      setExtraOptions((prev) => ({
                        ...prev,
                        fromDirection: newFromDirection,
                      }));
                    }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </MapItemChooser>
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
        <ChosenItemDisplay>
          <span>Map Item Preview</span>
          <div>
            <MapItemPreview alwaysShow style={chosenItemStyles}>
              {chosenItemTexts}
            </MapItemPreview>
          </div>
        </ChosenItemDisplay>
        <button
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(map));
          }}
        >
          Copy Map To Clipboard
        </button>
        {errors.length > 0 && (
          <>
            <ValidationHeadings>Errors</ValidationHeadings>
            <ul>
              {errors.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </>
        )}
        {warnings.length > 0 && (
          <>
            <ValidationHeadings>Warnings</ValidationHeadings>
            <ul>
              {warnings.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </>
        )}
      </Controls>
      <RelativeDiv>
        <StyledBoard cellSize={2.8}>
          <tbody>
            {new Array(dimensions.height).fill(null).map((_, y) => (
              <tr key={`map-row-${y}`}>
                {new Array(dimensions.width).fill(null).map((_, x) => {
                  const cellItems = map.items.filter(
                    (mi) => mi.x === x && mi.y === y
                  );

                  const elements = getAllElements(cellItems, map.items, [], []);
                  const styles = getAllStyles(cellItems);

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

                          if (chosenItem === "dock" && chosenItemCount >= 8) {
                            return prevItems;
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

                          if (chosenItem === "curved-conveyor") {
                            const { fromDirection } =
                              extraOptions as CurvedConveyorMapItem;

                            const oppositeDirection =
                              OPPOSITE[
                                (extraOptions as Partial<CurvedConveyorMapItem>)
                                  .direction!
                              ];

                            return prevItems.concat([
                              {
                                type: "curved-conveyor",
                                ...(extraOptions as Omit<
                                  CurvedConveyorMapItem,
                                  "type" | "x" | "y"
                                >),
                                x,
                                y,
                                fromDirection: fromDirection.filter(
                                  (nd) => nd !== oppositeDirection
                                ),
                                showStraight:
                                  fromDirection.includes(oppositeDirection),
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
