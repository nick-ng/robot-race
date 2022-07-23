import React from "react";
import styled from "styled-components";

import { useOptions, defaultOptions } from "../../hooks/options-context";
import getBorderStyle, {
  ROBOT_DESIGNS,
} from "../playing/robots/get-border-style";

const StyledRobotColors = styled.div`
  text-align: center;

  h3 {
    margin-top: 0;
  }
`;

const Robots = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 0.5em;
  margin-bottom: 0.5em;
  justify-content: center;

  input {
    width: 2vw;
    height: 2vw;
  }
`;

const Robot = styled.div`
  box-sizing: border-box;
  width: 2vw;
  height: 2vw;
  border-width: 0.25vw;
  border-radius: 0vw;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 90%;
    height: 90%;
  }
`;

export default function RobotColors() {
  const {
    options: { colors },
    setOptions,
  } = useOptions();

  return (
    <StyledRobotColors>
      <Robots>
        {ROBOT_DESIGNS.map((design) => (
          <Robot
            key={`design-${design}`}
            style={getBorderStyle(design, colors)}
          >
            <img src="/robot-triangle.svg" />
          </Robot>
        ))}
        {colors.map((color, i) => (
          <input
            key={`color-${i}`}
            type="color"
            value={color}
            onChange={(e) => {
              const newColors = [...colors];
              newColors[i] = e.target.value;

              setOptions({
                colors: newColors,
              });
            }}
          />
        ))}
      </Robots>

      <button
        onClick={() => {
          setOptions({ colors: defaultOptions.colors });
        }}
      >
        Default Colours
      </button>
    </StyledRobotColors>
  );
}
