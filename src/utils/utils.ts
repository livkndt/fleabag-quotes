export const getRandomHexCode = () => {
  const hexChars: string = '0123456789ABCDEF';
  let color: string = '#';

  for (let i: number = 0; i < 6; i++) {
    const randomIndex: number = Math.floor(Math.random() * hexChars.length);
    color += hexChars[randomIndex];
  }
  return color;
};
