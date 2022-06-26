import React from "react";

export default function SetProgramRegistersInstruction() {
  return (
    <>
      <p>
        Select a register then choose on a programming card (Move 1, Rotate,
        etc.) to set it. The first empty register will be selected automatically
        but you can program them in any order.
      </p>
      <p>
        If you change your mind about a register, you can either set a new
        instruction or clear it by clicking on it once it's selected.
      </p>
    </>
  );
}
