import React from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";

import { usePracticeGameData } from "../../hooks/use-practice-game-data";

const PLAYER_UUID = "practice-player";

import Playing from "../playing";

const StyledPractice = styled.div`
  display: flex;
  flex-direction: row;
`;

const MissionObjectives = styled.div`
  margin-left: 0.5em;
  flex-shrink: 1;
`;

export default function Practice() {
  const { missionName } = useParams();
  const {
    gameData,
    fullGameData,
    sendViaWebSocket,
    missionHeading,
    missionObjectives,
    nextMission,
  } = usePracticeGameData(PLAYER_UUID, missionName);

  const state = gameData.gameState.state;

  return (
    <StyledPractice>
      <Playing
        playerDetails={{
          playerId: PLAYER_UUID,
          playerPassword: PLAYER_UUID,
          playerName: "You",
        }}
        gameData={gameData}
        sendViaWebSocket={sendViaWebSocket}
      />
      <MissionObjectives>
        <h3>{missionHeading}</h3>
        {missionObjectives.map((text) => (
          <p key={text}>{text}</p>
        ))}
        {state === "over" && nextMission && (
          <Link to={`/mission/${nextMission}`}>Next Mission</Link>
        )}
        {process.env.NODE_ENV === "development" && (
          <pre>{JSON.stringify(fullGameData, null, "  ")}</pre>
        )}
      </MissionObjectives>
    </StyledPractice>
  );
}
