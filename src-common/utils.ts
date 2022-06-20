export const sleep = (ms: number) =>
  new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

export const randomString = (length: number) => {
  let string = "";
  for (let n = 0; n < length; n++) {
    const randomNumber = Math.floor(36 * Math.random());
    string = string + randomNumber.toString(36);
  }

  return string;
};

export const prevPlayer = (turnOrder: string[], activePlayer: string) => {
  const prevIndex =
    turnOrder.findIndex((player) => player === activePlayer) - 1;
  if (prevIndex < 0) {
    return turnOrder[turnOrder.length - 1];
  }

  return turnOrder[prevIndex];
};
