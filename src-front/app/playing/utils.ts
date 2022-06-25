export const positionToOffsets = ({
  x,
  y,
}: {
  x: number;
  y: number;
}): { x: string; y: string } => {
  const ratio = 2.8;
  const constant = 0.43;

  return {
    x: `${ratio * x + constant}vw`,
    y: `${ratio * y + constant}vw`,
  };
};
