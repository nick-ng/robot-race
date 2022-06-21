import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { PlayerGameData } from "../../../dist-common/game-types";

const StyledPractice = styled.div``;

const defaultGameData: PlayerGameData = {
  id: "1",
  shortId: "1",
  host: "player-1's-uuid",
  maxPlayers: 26,
  players: [{ id: "player-1's-uuid", name: "You" }],
  gameSettings: {
    cardsPerPlayer: 4,
  },
  yourSecrets: {
    password: "asdf",
    programRegisters: [],
    cardsInHand: [
      "card-uuid-01",
      "card-uuid-02",
      "card-uuid-03",
      "card-uuid-04",
      "card-uuid-05",
      "card-uuid-06",
      "card-uuid-07",
    ],
  },
  gameState: {
    state: "main",
    seatOrder: ["player-1's-uuid"],
    finishedProgrammingPlayers: [],
    poweringDownNextTurn: [],
    robotsDamage: {
      "player-1's-uuid": { damagePoints: 0, lockedRegisters: [] },
    },
    robotLives: { "player-1's-uuid": 3 },
    cardMap: {
      "card-uuid-01": {
        id: "card-uuid-01",
        action: "Move 1",
        priority: 4,
      },
      "card-uuid-02": {
        id: "card-uuid-02",
        action: "Move 2",
        priority: 5,
      },
      "card-uuid-03": {
        id: "card-uuid-03",
        action: "Move 3",
        priority: 6,
      },
      "card-uuid-04": {
        id: "card-uuid-04",
        action: "Back Up",
        priority: 3,
      },
      "card-uuid-05": {
        id: "card-uuid-05",
        action: "Rotate Right",
        priority: 2,
      },
      "card-uuid-06": {
        id: "card-uuid-06",
        action: "Rotate Left",
        priority: 1,
      },
      "card-uuid-07": {
        id: "card-uuid-07",
        action: "U-Turn",
        priority: 1,
      },
    },
  },
};

export default function Practice() {
  const [gameData, setGameData] = useState<PlayerGameData>(defaultGameData);

  return <StyledPractice>Test</StyledPractice>;
}
