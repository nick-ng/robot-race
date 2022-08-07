import React, { useState, useEffect } from "react";
import styled from "styled-components";

import type { Map, PlayerDetails } from "dist-common/game-types";

import { toAmbidextrousQuote } from "dist-common/utils";
import { mapList } from "dist-common/maps";
import { parseMap } from "dist-common/maps/parse-map";

import { MAP_STORE } from "../map-editor";

declare const API_ORIGIN: string;

const CustomMapCell1 = styled.td`
  max-width: 10em;
`;

const CustomMapCell = styled.td`
  max-width: 0;

  div {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }

  textarea {
    margin-top: 0.5em;
    resize: none;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
`;

interface MapChooserProps {
  map: Map;
  isHost: boolean;
  gameId: string;
  playerDetails: PlayerDetails;
}

export default function MapChooser({
  map,
  isHost,
  gameId,
  playerDetails,
}: MapChooserProps) {
  const { name } = map;

  const [mapChoice, setMapChoice] = useState<Map["name"] | "custom" | null>(
    null
  );
  const [mapChoiceLoading, setMapChoiceLoading] = useState(false);
  const [mapJSONString, setMapJSONString] = useState("");
  const [mapErrors, setMapErrors] = useState<string[]>([]);

  const mapInfo = mapList.find(
    (m) => m.mapName.toLowerCase() === name.toLowerCase()
  );

  useEffect(() => {
    if (name) {
      setMapChoice(name);
    }
  }, [name]);

  useEffect(() => {
    if (mapJSONString) {
      const fixedMapJSON = toAmbidextrousQuote(mapJSONString);
      const { errors } = parseMap(fixedMapJSON);

      setMapErrors(errors);

      if (errors.length === 0) {
        setMapChoiceLoading(true);
        (async () => {
          await fetch(`${API_ORIGIN}/api/game/${gameId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "x-player-id": playerDetails.playerId,
              "x-player-password": playerDetails.playerPassword,
            },
            body: JSON.stringify({
              action: "change-map",
              mapName: "custom",
              mapJSON: fixedMapJSON,
            }),
          });
          setMapChoiceLoading(false);
        })();
      }
    }
  }, [mapJSONString]);

  return (
    <>
      <tr>
        <td>Map</td>
        <td>
          {isHost ? (
            <select
              disabled={!isHost || mapChoiceLoading}
              value={mapChoice || "risky exchange"}
              onChange={async (e) => {
                const mapName = e.target.value;
                if (mapName === "custom") {
                  setMapChoice("custom");
                  return;
                }

                setMapChoiceLoading(true);
                await fetch(`${API_ORIGIN}/api/game/${gameId}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "x-player-id": playerDetails.playerId,
                    "x-player-password": playerDetails.playerPassword,
                  },
                  body: JSON.stringify({
                    action: "change-map",
                    mapName,
                  }),
                });
                setMapChoiceLoading(false);
              }}
            >
              {mapList.map((m) => {
                const optionSummary = m.description.map((a) => a[1]).join(", ");
                return (
                  <option key={m.mapName} value={m.mapName}>
                    {m.mapDisplayName}
                    {m.description.length > 0 ? `: ${optionSummary}` : ""}
                  </option>
                );
              })}
            </select>
          ) : (
            mapInfo?.mapDisplayName
          )}
        </td>
      </tr>
      {mapInfo &&
        mapInfo.description.map((d) => (
          <tr key={d[0]}>
            <td>{d[0]}</td>
            <td>{d[1]}</td>
          </tr>
        ))}
      {isHost && mapChoice === "custom" && (
        <tr>
          <CustomMapCell1>
            Load from the map editor or paste a valid map "code"
          </CustomMapCell1>
          <CustomMapCell>
            <div>
              <button
                onClick={() => {
                  setMapJSONString(localStorage.getItem(MAP_STORE) || "");
                }}
              >
                Load Saved
              </button>
              <textarea
                value={mapJSONString}
                onChange={(e) => {
                  setMapJSONString(e.target.value);
                }}
              />
            </div>
          </CustomMapCell>
        </tr>
      )}
      {isHost && mapChoice === "custom" && mapErrors.length > 0 && (
        <tr>
          <CustomMapCell1>Map Errors</CustomMapCell1>
          <CustomMapCell>
            {mapErrors.map((me) => (
              <p key={me}>{me}</p>
            ))}
          </CustomMapCell>
        </tr>
      )}
    </>
  );
}
