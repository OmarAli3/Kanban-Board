export const filterOutEnumNumbers = (enumObj: any) => {
  return Object.keys(enumObj).filter((key) => isNaN(Number(key)));
};
