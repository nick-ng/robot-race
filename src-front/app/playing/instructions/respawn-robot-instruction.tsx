import React from "react";

export default function RespawnRobotInstruction({
  isBlocked,
}: {
  isBlocked?: boolean;
}) {
  return isBlocked ? (
    <>
      <p>
        Your archive marker is blocked by another robot! Choose a square to
        spawn on.
      </p>
      <p>Then choose a direction to face.</p>
    </>
  ) : (
    <p>Choose a direction to face.</p>
  );
}
