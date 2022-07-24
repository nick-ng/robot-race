import type {
  AutomaticAction,
  DealProgramCardsAction,
} from "../../../dist-common/game-action-types";
import { shuffle } from "../../../dist-common/card-map";
import Game, { TURN_PHASES } from "../game-class";
import { setRobotDamage } from "./utils";

const dealProgramCards = (
  game: Game,
  _action: DealProgramCardsAction
): {
  game: Game;
  message: string;
  automaticAction?: AutomaticAction;
} => {
  const { playerSecrets, gameState, gameSecrets } = game;
  if (gameState.state !== "main") {
    return {
      game,
      message: "Not main state",
    };
  }

  const {
    discardedCards,
    robots,
    seatOrder,
    poweringDownNextTurn,
    finishedProgrammingPlayers,
  } = gameState;

  // 00. Increment the turn number and set turn phase to 0
  gameState.turn = gameState.turn + 1;
  gameState.turnPhase = TURN_PHASES.dealCards;

  // 05. Power down robots.
  poweringDownNextTurn.forEach((decision) => {
    if (decision.decision === "no") {
      return;
    }

    const robot = robots.find((r) => r.playerId === decision.playerId);
    if (!robot) {
      return;
    }

    setRobotDamage(robot, 0);
    robot.status = "powered-down";
    finishedProgrammingPlayers.push(decision.playerId);
  });
  gameState.poweringDownNextTurn = [];

  // 20. Figure out how many cards you need
  let cardsNeeded = 0;
  // 10. Collect cards
  // Cards are supposed to be collected in an earlier step. Double check here.
  for (const entry of Object.entries(playerSecrets)) {
    const [playerId, player] = entry;

    // 11. Players' unused cards
    discardedCards.push(...player.cardsInHand);
    player.cardsInHand = [];
    const robot = robots.find((r) => r.playerId === playerId);

    // 12. Cards on unlocked robot registers
    player.programRegisters.forEach((cardId, i) => {
      if (robot?.lockedRegisters.includes(i)) {
        return;
      }

      if (cardId !== null) {
        discardedCards.push(cardId);
        player.programRegisters[i] = null;
      }
    });

    // 20. Figure out how many cards are needed.
    if (robot?.status === "ok") {
      cardsNeeded += 9 - (robot?.damagePoints || 0);
    }
  }

  // 30. Check if you have enough cards.
  if (gameSecrets.remainingDeck.length < cardsNeeded) {
    const shuffledDiscardedCards = shuffle(discardedCards);
    gameSecrets.remainingDeck = gameSecrets.remainingDeck.concat(
      shuffledDiscardedCards
    );
    gameState.discardedCards = [];
  }

  const playersThatNeedCards = seatOrder.filter((p) => {
    const robot = robots.find((r) => r.playerId === p);
    return robot && robot.status === "ok";
  });

  let continueDealing = false;
  do {
    continueDealing = false;
    for (const playerId of playersThatNeedCards) {
      const onePlayerSecrets = playerSecrets[playerId];
      const robot = robots.find((r) => r.playerId === playerId);
      const handSize = 9 - (robot?.damagePoints || 0);
      if (onePlayerSecrets.cardsInHand.length < handSize) {
        onePlayerSecrets.cardsInHand.push(gameSecrets.remainingDeck.shift()!);
        continueDealing = true;
      }
    }
  } while (continueDealing);

  return {
    game,
    message: "OK",
    automaticAction: {
      action: { playerId: "server", type: "finish-setting-registers" },
      delay: 50,
    },
  };
};

export default dealProgramCards;
