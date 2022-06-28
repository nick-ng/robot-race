import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledPingDisplay = styled.div`
  position: fixed;
  top: 0.2em;
  right: 0.5em;
  opacity: 0.25;
  transition: all 0.5s;
  text-align: right;

  &:hover {
    opacity: 1;
  }

  a {
    color: #ffffff;
  }
`;

export default function PingDisplay({
  roundTripTime,
}: {
  roundTripTime: number;
}) {
  return (
    <StyledPingDisplay>
      <div>Ping: {roundTripTime} ms</div>
      <div>
        <Link to="/">Home</Link>
      </div>
    </StyledPingDisplay>
  );
}
