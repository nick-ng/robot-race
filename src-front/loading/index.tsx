import React from "react";
import styled, { keyframes } from "styled-components";

const count = 8;

const rotate = keyframes`
from {
  transform: rotate(0deg)
}

to {
  transform: rotate(${360 * count}deg)
}`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} ${0.3 * count}s ease-in-out infinite alternate;
  padding: 1em;
`;

export default function Loading() {
  return <Rotate>Loading</Rotate>;
}
