import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledMissions = styled.div`
  h3 {
    margin-top: 0;
  }

  li {
    margin: 0.5em 0;
  }
`;

export default function Missions() {
  return (
    <StyledMissions>
      <h3>Training Missions</h3>
      <ul>
        <li>
          <Link to="/mission/1-movement">1: Movement</Link>
        </li>
        <li>
          <Link to="/mission/2-movement">2: More Movement</Link>
        </li>
        <li>
          <Link to="/mission/3-turns">3: Turns</Link>
        </li>
        <li>
          <Link to="/mission/4-walls">4: Walls</Link>
        </li>
      </ul>
      <h3>Other Stuff</h3>
      <ul>
        <li>
          <Link to="/mission/free-practice">Free Practice</Link>
        </li>
        <li>
          <Link to="/editor">Map Editor</Link>
        </li>
      </ul>
    </StyledMissions>
  );
}
