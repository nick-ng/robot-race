import React from "react";
import styled from "styled-components";

import { RepairMapItem, MapItemNoId } from "dist-common/game-types";

const StyledRepair = styled.div`
  width: 100%;
  height: 100%;
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
  z-index: 1;

  font-size: 200%;
`;

interface RepairProps {
  cellItems: MapItemNoId[];
}

export default function Repair({ cellItems }: RepairProps) {
  const repairItem = cellItems.find((a) => a.type === "repair") as
    | RepairMapItem
    | undefined;

  if (!repairItem) {
    return null;
  }

  return <StyledRepair>🔧</StyledRepair>;
}

export const getRepairToolTip = (cellItems: MapItemNoId[]) => {
  if (cellItems.find((a) => a.type === "repair")) {
    return "If your robot is on a repair square after all 5 program have been performed, it will repair 1 damage point.";
  }

  return null;
};
