import { css, keyframes } from "styled-components";

export const wiggleAnimation = keyframes`
  0% {margin-left: -1em;}
  10% {margin-left: 1em;}
  20% {margin-left: -0.8em;}
  30% {margin-left: 0.8em;}
  40% {margin-left: -0.6em;}
  50% {margin-left: 0.6em;}
  60% {margin-left: -0.4em;}
  70% {margin-left: 0.4em;}
  80% {margin-left: -0.2em;}
  90% {margin-left: 0.2em;}
  100% {margin-left: 0em;}
`;

export const wiggleAnimationMixin = css`
  animation: ${wiggleAnimation} 0.8s linear;
`;
