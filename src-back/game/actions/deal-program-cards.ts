import { DealProgramCardsAction } from "../../../dist-common/game-action-types";
import Game from "../game-class";

import { shuffle } from "../utils";

const dealProgramCards = (
  game: Game,
  _action: DealProgramCardsAction
): {
  game: Game;
  message: string;
} => {
  const { playerSecrets, gameState, gameSecrets } = game;
  if (gameState.state !== "main") {
    return {
      game,
      message: "Not main state",
    };
  }

  const { discardedCards, robots, seatOrder } = gameState;

  // 20. Figure out how many cards you need
  let cardsNeeded = 0;
  // 10. Collect cards
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
    cardsNeeded += 9 - (robot?.damagePoints || 0);
  }

  // 30. Check if you have enough cards.
  if (gameSecrets.remainingDeck.length < cardsNeeded) {
    const shuffledDiscardedCards = shuffle(discardedCards);
    gameSecrets.remainingDeck = gameSecrets.remainingDeck.concat(
      shuffledDiscardedCards
    );
    gameState.discardedCards = [];
  }

  let continueDealing = false;
  do {
    continueDealing = false;
    for (const playerId of seatOrder) {
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
  };
};

export default dealProgramCards;
