export const positionToOffsets = ({
  x,
  y,
}: {
  x: number;
  y: number;
}): { x: string; y: string } => {
  const ratioX = 2.8;
  const ratioY = 2.805;
  const ratioPxX = 0;
  const ratioPxY = 0;
  const constantX = 0.43;
  const constantY = 0.43;

  return {
    x: `calc(${ratioX * x + constantX}vw + ${ratioPxX * x}px)`,
    y: `calc(${ratioY * y + constantY}vw + ${ratioPxY * y}px)`,
  };
};
