import React from "react";
import styled from "styled-components";

import type { DockMapItem, MapItemNoId } from "dist-common/game-types";

const StyledDock = styled.div`
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

  img {
    width: 50%;
    height: 50%;
  }
`;

interface DockProps {
  cellItems: MapItemNoId[];
}

export default function Dock({ cellItems }: DockProps) {
  const dock = cellItems.find((a) => a.type === "dock") as DockMapItem;

  if (!dock) {
    return null;
  }

  return (
    <StyledDock>
      <img src="/robot-triangle.svg" />
      {dock.number}
    </StyledDock>
  );
}

export const getDockText = (cellItems: MapItemNoId[]) => {
  const dock = cellItems.find((a) => a.type === "dock") as DockMapItem;

  if (dock) {
    return `🤖${dock.number}`;
  }

  return null;
};
