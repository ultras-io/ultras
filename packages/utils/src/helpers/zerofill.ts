const zerofill = (value: number, length: number = 2): string => {
  let strValue = value.toString();
  while (strValue.length < length) {
    strValue = '0' + strValue;
  }

  return strValue;
};

export default zerofill;
