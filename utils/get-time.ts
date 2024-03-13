export const getTimeString = (date = new Date()) => {
  return `${date.getHours()}:${date.getMinutes()}`;
};
