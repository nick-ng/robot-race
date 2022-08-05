import React from "react";
import styled from "styled-components";

import { Robot } from "dist-common/game-types";

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

export const Robots = styled.div`
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

export const RobotWithDesign = ({ design }: { design: Robot["design"] }) => {
  const {
    options: { colors },
  } = useOptions();
  return (
    <Robot style={getBorderStyle(design, colors)}>
      <img src="/robot-triangle.svg" />
    </Robot>
  );
};

export default function RobotColors() {
  const {
    options: { colors },
    setOptions,
  } = useOptions();

  return (
    <StyledRobotColors>
      <Robots>
        {ROBOT_DESIGNS.map((design) => (
          <RobotWithDesign key={`design-${design}`} design={design} />
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
