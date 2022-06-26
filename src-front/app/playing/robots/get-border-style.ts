const getBorderStyle = (design: string) => {
  switch (design) {
    case "dotted":
    case "dashed":
    case "double":
      return {
        borderStyle: design,
        borderColor: "white",
      };
    case "ridge":
    case "outset":
      return {
        borderStyle: design,
      };
    case "white":
    case "black":
      return {
        borderStyle: "solid",
        borderColor: design,
      };
    default:
      return {
        borderStyle: "solid",
        borderColor: "gainsboro",
      };
  }
};

export default getBorderStyle;
