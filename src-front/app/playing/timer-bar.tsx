import React from "react";
import styled, { keyframes } from "styled-components";

const TimerAnimation = keyframes`
0% {
  width: 100%;
}

100% {
  width: 0%;
}
`;

const WhiteBlackAnimation = keyframes`
0% {
  color: #ffffff;
}

100% {
  color: #000000;
}
`;

const TimerOuterBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
`;

const TimerInnerBar = styled.div<{ timerDuration: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  animation-name: ${TimerAnimation};
  animation-duration: ${({ timerDuration }) => timerDuration}s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: 1;
  background-color: #ffffff;
`;

const TimerText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;

  animation-name: ${WhiteBlackAnimation};
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  z-index: 1;
  font-weight: bold;
`;

interface TimerBarProps {
  timerDuration: number;
  timerText?: string;
  showText: boolean;
}

export default function TimerBar({
  timerDuration,
  timerText,
  showText,
}: TimerBarProps) {
  return (
    <TimerOuterBar>
      <TimerInnerBar timerDuration={timerDuration}></TimerInnerBar>
      {showText && <TimerText>{timerText || "Hurry Up!"}</TimerText>}
    </TimerOuterBar>
  );
}
