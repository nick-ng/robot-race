import React from "react";

export default function SetProgramRegistersInstruction({
  smallerPriorityFirst,
}: {
  smallerPriorityFirst?: boolean;
}) {
  return (
    <>
      <p>
        Select a register then choose on a program card to set it. The first
        empty register will be selected automatically but you can program them
        in any order by clicking on the register you want.
      </p>
      <p>
        If you change your mind about a register, you can either set a new
        instruction or clear it by clicking on it once it's selected.
      </p>
      <p>
        All instructions are executed from the perspective of the robot. i.e. if
        the robot is facing to the left, Move cars will move it to the left,
        Back Up will move it to the right, Rotate Left will cause it to point
        down etc.
      </p>
      <p>
        All robots will execute register 1, then they will all execute register
        2 and so on. Within a register, cards with a{" "}
        {smallerPriorityFirst ? "smaller" : "larger"} priority number are
        executed first.
      </p>
    </>
  );
}
