const getBorderStyle = (design: string) => {
  switch (design) {
    case "dotted":
    case "dashed":
    case "double":
      return {
        borderStyle: design,
        borderColor: "#ffffff",
      };
    case "ridge":
    case "outset":
      return {
        borderStyle: design,
      };
    case "#ffffff":
    case "#000000":
      return {
        borderStyle: "solid",
        borderColor: design,
      };
    default:
      return {
        borderStyle: "solid",
        borderColor: "#dcdcdc",
      };
  }
};

export default getBorderStyle;
