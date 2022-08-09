import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

import { useSounds } from "../../hooks/sounds-context";
import { useOptions } from "../../hooks/options-context";

export const TimerContainer = styled.div<{ fullHeight: boolean }>`
  position: relative;
  min-height: ${({ fullHeight }) => (fullHeight ? "1.125em" : "0.5em")};
`;

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
  const { timer: timerSound } = useSounds();
  const { options } = useOptions();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const timerSeconds = timerDuration - (options.ping || 0) / 2000;

  useEffect(() => {
    if (showText) {
      if (!timeoutRef.current) {
        timerSound.volume = 0.25;
        timeoutRef.current = setTimeout(() => {
          timerSound.play();
        }, (timerSeconds - timerSound.duration) * 1000);
      }
    } else {
      timerSound.pause();
      timerSound.currentTime = 0;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = null;
    }

    return () => {
      timerSound.pause();
      timerSound.currentTime = 0;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = null;
    };
  }, [showText]);

  return (
    <TimerOuterBar>
      <TimerInnerBar timerDuration={timerSeconds}></TimerInnerBar>
      {showText && <TimerText>{timerText || "Hurry Up!"}</TimerText>}
    </TimerOuterBar>
  );
}
