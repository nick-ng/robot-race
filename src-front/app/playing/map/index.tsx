import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import type { PlayerDetails, PlayerGameData } from "dist-common/game-types";
import type { ActionIncomingMessageObject } from "dist-common/game-action-types";

import Board from "./board";
import Robots from "../robots";
import RobotSpawner from "./robot-spawner";

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

export const StyledMap = styled.div`
  position: relative;
`;

interface MapProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  sendViaWebSocket: (messageObject: ActionIncomingMessageObject) => void;
  maxDockBayDisplay?: number;
}

export default function Map({
  gameData,
  playerDetails,
  sendViaWebSocket,
  maxDockBayDisplay,
}: MapProps) {
  const { gameSettings, gameState } = gameData;
  const { map } = gameSettings;
  const { animations, robots } = gameState;

  const [prevShoot, setPrevShoot] = useState(false);
  const utterance = useRef<SpeechSynthesisUtterance>(
    new SpeechSynthesisUtterance("pew")
  ).current;

  const shoot = animations.includes("map-laser");

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find((v) => v.default);
    if (!voice) {
      voice = voices[0];
    }
    utterance.volume = 0;
    if (voice) {
      utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    if (shoot && !prevShoot) {
      if (utterance.voice) {
        utterance.volume = 0.5;
        window.speechSynthesis.speak(utterance);
      }
    }

    setPrevShoot(shoot);
  }, [shoot]);

  return (
    <StyledMap>
      <Board
        map={map}
        cellSize={2.8}
        maxDockBayDisplay={maxDockBayDisplay || 0}
        robots={robots}
        animations={animations}
      />
      <Robots gameData={gameData} playerDetails={playerDetails} />
      <RobotSpawner
        gameData={gameData}
        playerDetails={playerDetails}
        sendViaWebSocket={sendViaWebSocket}
      />
    </StyledMap>
  );
}
