const getBorderStyle = (design: string) => {
  switch (design) {
    case "dotted":
    case "dashed":
    case "double":
    case "ridge":
    case "outset":
      return {
        borderStyle: design,
        borderColor: "white",
      };
    case "white":
    case "black":
      return {
        borderStyle: "solid",
        borderColor: design,
      };
    default:
      return {
        borderStyle: "gainsboro",
        borderColor: design,
      };
  }
};

export default getBorderStyle;
