const Nvh = (value) => {
    if (
      value === "null" ||
      value === null ||
      value === "undefined" ||
      value === undefined ||
      value === "Default"
    ) {
      return "";
    }
  
    return value;
  };
  
  export default Nvh;