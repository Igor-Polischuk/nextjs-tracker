export const uppercaseFirstLetter = (str: string): string => {
  const firstLetter = str[0].toUpperCase();

  return firstLetter + str.slice(1);
};
