/**
 * Generate a random number with specific length
 * @param length - count of symbols
 */
const getRandomNumber = (length: number): number => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default getRandomNumber;
