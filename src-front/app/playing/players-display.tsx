import React from "react";
import styled from "styled-components";

interface PlayersDisplayProps {
  seatOrder: string[];
  fingerOnNose: string[];
}

const Container = styled.div`
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
    <Container>
      {seatOrder.map((playerId) => (
        <Player key={playerId}>
          {fingerOnNose.includes(playerId) ? "🤫" : "🙂"}
        </Player>
      ))}
    </Container>
  );
}
