import React from "react";
import { getFlagEmoji } from "../../utils";

export default function TouchFlagsInstruction({
  nextFlag,
}: {
  nextFlag: number;
}) {
  return (
    <>
      <p>
        Try and touch all the flag {getFlagEmoji()} squares in order. You need
        to finish a move instruction on the flag and not get pushed off (or get
        pushed on) to touch a flag.
      </p>
      <p>
        You need to touch flag {getFlagEmoji()}
        {nextFlag} next.
      </p>
    </>
  );
}
