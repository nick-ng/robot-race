import React from "react";
import styled, { css, keyframes } from "styled-components";

import { Robot } from "dist-common/game-types";

import { useOptions, defaultOptions } from "../../hooks/options-context";
import getBorderStyle, {
  ROBOT_DESIGNS,
} from "../playing/robots/get-border-style";

const bounceAnimation = keyframes`
0% {
  bottom: 0.2vw;
}

50% {
  bottom: -0.2vw;
}

100% {
  bottom: 0.2vw;
}
`;

const bounceAnimationMixin = css`
  animation: ${bounceAnimation} 1s linear infinite;
`;

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

const Robot = styled.div<{ bounce: boolean }>`
  box-sizing: border-box;
  width: 2vw;
  height: 2vw;
  border-width: 0.25vw;
  border-radius: 0vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    ${({ bounce }) => (bounce ? bounceAnimationMixin : "")}
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 90%;
  }
`;

export const RobotWithDesign = ({
  bounce,
  design,
}: {
  bounce?: boolean;
  design: Robot["design"];
}) => {
  const {
    options: { colors },
  } = useOptions();
  return (
    <Robot bounce={bounce || false} style={getBorderStyle(design, colors)}>
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
