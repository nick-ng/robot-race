import React from "react";
import styled from "styled-components";

import { PlayerGameData, PlayerDetails } from "../../../dist-common/game-types";
import { WebsocketIncomingMessageObject } from "../../../dist-common/websocket-message-types";

import PlayersDisplay from "./players-display";
import CardsInHand from "./cards-in-hand";

interface PlayingProps {
  gameData: PlayerGameData;
  playerDetails: PlayerDetails;
  sendViaWebSocket: (messageObject: WebsocketIncomingMessageObject) => void;
}

const Container = styled.div`
  display: inline-block;
`;

const FingerOnNoseButton = styled.button`
  border: 0.6vw outset black;
  background-color: #dddddd;
  cursor: pointer;
  width: 100%;
  height: 5em;

  &:active {
    border-style: inset;
  }
`;

export default function Playing({
  gameData,
  playerDetails,
  sendViaWebSocket,
}: PlayingProps) {
  const { id, shortId, gameState } = gameData;

  if (gameState.state !== "main") {
    return <Container>Something went wrong</Container>;
  }

  const { seatOrder, fingerOnNose } = gameState;

  return (
    <Container>
      <p>Game ID: {shortId}</p>
      <PlayersDisplay seatOrder={seatOrder} fingerOnNose={fingerOnNose} />
      <hr />
      <CardsInHand
        cardWidth={12}
        gameData={gameData}
        handleCardChoice={(cardId) => {
          sendViaWebSocket({
            type: "action",
            playerId: playerDetails.playerId,
            playerPassword: playerDetails.playerPassword,
            gameId: id,
            action: {
              type: "choose-card",
              playerId: playerDetails.playerId,
              cardId,
            },
          });
        }}
      />
      <hr />
      <FingerOnNoseButton
        onClick={() => {
          sendViaWebSocket({
            type: "action",
            playerId: playerDetails.playerId,
            playerPassword: playerDetails.playerPassword,
            gameId: id,
            action: {
              type: "finger-on-nose",
              playerId: playerDetails.playerId,
            },
          });
        }}
      >
        Put Finger on Nose 🤫
      </FingerOnNoseButton>
    </Container>
  );
}
