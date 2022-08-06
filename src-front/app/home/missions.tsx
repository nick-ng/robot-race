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
        <li>
          <Link to="/mission/5-conveyors-1">5: Conveyors 1</Link>
        </li>
        <li>
          <Link to="/mission/6-conveyors-2">6: Conveyors 2</Link>
        </li>
        <li>
          <Link to="/mission/7-conveyors-3">7: Conveyors 3</Link>
        </li>
        <li>
          <Link to="/mission/8-gears">8: Gears</Link>
        </li>
      </ul>
      <h3>Other Missions</h3>
      <ul>
        <li>
          <Link to="/mission/free-practice">Free Practice</Link>
        </li>
      </ul>
    </StyledMissions>
  );
}
