import React, { useState, useRef } from "react";
import styled from "styled-components";

import { useOptions } from "../hooks/options-context";
import RobotColors from "./home/robot-colors";

const StyledOptions = styled.div`
  position: relative;
`;

const OptionsMenu = styled.div`
  position: absolute;
  top: 2em;
  right: 0;
  width: max-content;
  background-color: #000000;
  border: 1px solid #808080;
  padding: 0.5em;

  label {
    display: block;
    margin-bottom: 0.5em;
  }
`;

export default function Options() {
  const { options, setOptions } = useOptions();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const timeOutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <StyledOptions>
      <details
        open={detailsOpen}
        onToggle={(e) => {
          const detailsEl = e.target as HTMLDetailsElement;
          if (timeOutIdRef.current !== null) {
            clearTimeout(timeOutIdRef.current);
          }

          setDetailsOpen(detailsEl.open);

          if (detailsEl.open) {
            timeOutIdRef.current = setTimeout(() => {
              setDetailsOpen(false);
            }, 30000);
          }
        }}
      >
        <summary>Options</summary>
        <OptionsMenu>
          <label>
            <input
              checked={options.smallerPriorityFirst}
              type="checkbox"
              onChange={(e) => {
                setOptions({ smallerPriorityFirst: e.target.checked });
              }}
            />{" "}
            Smaller Priority Numbers First
          </label>
          <RobotColors />
        </OptionsMenu>
      </details>
    </StyledOptions>
  );
}
