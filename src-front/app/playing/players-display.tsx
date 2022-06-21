import React from "react";
import styled from "styled-components";

interface PlayersDisplayProps {
  seatOrder: string[];
  fingerOnNose: string[];
}

const StyledPlayersDisplay = styled.div`
  text-align: center;
`;

const Player = styled.div`
  display: inline-block;
  font-size: 1.5vw;
`;

export default function PlayersDisplay({
  seatOrder,
  fingerOnNose,
}: PlayersDisplayProps) {
  return (
    <StyledPlayersDisplay>
      {seatOrder.map((playerId) => (
        <Player key={playerId}>
          {fingerOnNose.includes(playerId) ? "🤫" : "🙂"}
        </Player>
      ))}
    </StyledPlayersDisplay>
  );
}
