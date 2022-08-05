import React, { useEffect, useState, useRef } from "react";

import type {
  MainGameState,
  PlayerDetails,
  PlayerGameData,
} from "dist-common/game-types";

import { useOptions } from "../../../hooks/options-context";

import Robot from "./robot";

interface RobotsProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
}

export default function Robots({ gameData, playerDetails }: RobotsProps) {
  const { gameState, players } = gameData;
  const { robots, animations } = gameState as MainGameState;
  const [prevShoot, setPrevShoot] = useState(false);
  const utterance = useRef<SpeechSynthesisUtterance>(
    new SpeechSynthesisUtterance("pew")
  ).current;

  const shoot =
    animations.includes("robot-laser") && robots.some((r) => r.laser);

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
    <>
      {robots
        .filter((robot) => robot.status !== "stand-by")
        .map((robot) => (
          <Robot
            key={robot.playerId}
            name={players.find((a) => a.id === robot.playerId)?.name}
            isPlayer={playerDetails.playerId === robot.playerId}
            robot={robot}
          />
        ))}
    </>
  );
}
