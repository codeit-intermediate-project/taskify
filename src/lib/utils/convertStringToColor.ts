const colorPalette = [
  '#1230AE',
  '#6C48C5',
  '#C68FE6',
  '#6439FF',
  '#4F75FF',
  '#624E88',
  '#8967B3',
  '#CB80AB',
  '#FF885B',
  '#557C56',
  '#654520',
  '#825B32',
  '#6CBEC7',
  '#16423C',
  '#6A9C89',
  '#BF2EF0',
  '#ED3EF7',
  '#7C00FE',
  '#FFAF00',
  '#F5004F',
  '#0079FF',
  '#FF0060',
  '#FFB200',
  '#EB5B00',
  '#E4003A',
  '#B60071',
];

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

export const stringToHex = (string: string) => {
  const hash = hashString(string);
  const index = hash % colorPalette.length;
  return colorPalette[index];
};

export const stringToRgba = (string: string, alpha: number = 1): string => {
  let hex = stringToHex(string);
  hex = hex.replace(/^#/, '');

  if (hex.length === 4) {
    hex = hex
      .split('')
      .map((char, i) => (i === 0 ? char + char : char))
      .join('');
  }

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
