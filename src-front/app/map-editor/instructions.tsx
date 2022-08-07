import React from "react";
import styled from "styled-components";

const StyledInstructions = styled.div`
  margin-top: 0.25em;
  max-width: 30em;

  h3,
  p {
    margin: 0.75em 0 0;
  }
`;

export default function Instructions() {
  return (
    <StyledInstructions>
      <h3>Creating a Map</h3>
      <p>
        Choose what type of map piece you want, what direction and settings you
        want for the piece if necessary then place them on the map by clicking.
        You can see what the piece will look like in the Map Piece Preview.
      </p>
      <p>
        All maps must have exactly 8 Dock Bays for robots to start on and at
        least 1 flag. Dock bays and flags will be numbered in the order you
        place them.
      </p>
      <p>
        Any problems with your map will be displayed on the left. Warnings will
        be handled automatically when you host a game with your map but Errors
        need to be fixed manually. It is best to fix all warnings and errors
        before playing so important map features don't get removed unexpectedly.
      </p>
      <p>
        To remove all map pieces of a certain type, choose the type you want to
        remove and click the "Clear" button at the top of the side control
        panel. This is useful if you want to re-order the dock bays or flags. If
        you want to start over, choose the "Erase" type then click the "Clear
        All Map Items" button.
      </p>
      <h3>Saving and Loading Maps</h3>
      <p>
        Your map will be saved automatically once you've placed 6 or more
        pieces. If you clear your map by accident, you can refresh the page
        before placing any items to restore your work.
      </p>
      <p>
        If you want to save multiple maps, click the "Copy Map to Clipboard"
        button and paste your map "code" into Notepad or any text editor. If you
        need to make changes to a map you've saved this way, copy and paste your
        map "code" into the import box above and click "Import".
      </p>
      <h3>Playing on Your Maps</h3>
      <p>
        Once you are happy with how your map looks, you can try playing on it.
        Host a game from the home page as usual and choose "Custom" map. You can
        then paste your map "code" in the box or if you want to play on the map
        you were working on, you can click "Load saved".
      </p>
    </StyledInstructions>
  );
}
