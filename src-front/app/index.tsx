import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import randomUUID from "src-front/utils/random-uuid";
import { useOptions } from "../hooks/options-context";
import PreLobby from "./home";
import Game from "./game";
import Practice from "./practice";
import Options from "./options";
import MapEditor from "./map-editor";

const PLAYER_NAME_STORE = "ROBOT_RACE_PLAYER_NAME_STORE";
const PLAYER_ID_STORE = "ROBOT_RACE_PLAYER_ID_STORE";
const PLAYER_PASSWORD_STORE = "ROBOT_RACE_PLAYER_PASSWORD_STORE";

const StyledApp = styled.div`
  padding: 0 0.5em;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;

const TopBarItem = styled.div`
  & + & {
    margin-left: 1em;
  }
`;

const TopBarSpacer = styled.div`
  flex-grow: 1;
  content: "";
`;

const Form = styled.form`
  label,
  input,
  button {
    display: block;
  }
`;

export default function App() {
  const [playerDetails, setPlayerDetails] = useState(() => {
    return {
      playerName: localStorage.getItem(PLAYER_NAME_STORE) || "",
      playerId: localStorage.getItem(PLAYER_ID_STORE) || "",
      playerPassword: localStorage.getItem(PLAYER_PASSWORD_STORE) || "",
    };
  });
  const [tempPlayerName, setTempPlayerName] = useState("");
  const { options } = useOptions();

  const havePlayerCredentials =
    playerDetails.playerId &&
    playerDetails.playerName &&
    playerDetails.playerPassword;

  return (
    <StyledApp>
      <TopBar>
        {playerDetails.playerName && (
          <TopBarItem>Name: {playerDetails.playerName}</TopBarItem>
        )}
        {typeof options.ping === "number" && (
          <TopBarItem>Ping: {options.ping} ms</TopBarItem>
        )}
        <TopBarSpacer />
        <TopBarItem>
          <Options />
        </TopBarItem>
        <TopBarItem>
          <Link to="/">Home</Link>
        </TopBarItem>
      </TopBar>
      {!playerDetails.playerName && (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (!tempPlayerName) {
              alert("Cannot have a blank name");
              return;
            }

            const tempDetails = {
              ...playerDetails,
              playerName: tempPlayerName,
            };

            if (!playerDetails.playerId) {
              tempDetails.playerId = randomUUID();
              localStorage.setItem(PLAYER_ID_STORE, tempDetails.playerId);
            }

            if (!playerDetails.playerPassword) {
              tempDetails.playerPassword = randomUUID();
              localStorage.setItem(
                PLAYER_PASSWORD_STORE,
                tempDetails.playerPassword
              );
            }

            localStorage.setItem(PLAYER_NAME_STORE, tempPlayerName);
            setPlayerDetails(tempDetails);
          }}
        >
          <label>Please enter your name</label>
          <input
            type="text"
            value={tempPlayerName}
            onChange={(e) => {
              setTempPlayerName(
                e.target.value.replaceAll(/[^a-z0-9\-_ ]/gi, "")
              );
            }}
          />
          <button>Save</button>
          <p>
            Entering a name and click save or pressing enter will generate a
            unique ID and password which will be stored in your browser's local
            storage. These are used to identify you when hosting and joining
            games.
          </p>
        </Form>
      )}

      {havePlayerCredentials && (
        <Routes>
          <Route
            path="/"
            element={<PreLobby playerDetails={playerDetails} />}
          />
          <Route path="/mission/:missionName" element={<Practice />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/editor" element={<MapEditor />} />
          <Route
            path="/game/:gameId"
            element={<Game playerDetails={playerDetails} />}
          />
        </Routes>
      )}
    </StyledApp>
  );
}
