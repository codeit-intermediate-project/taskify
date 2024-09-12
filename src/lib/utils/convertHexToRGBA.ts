const convertHexToRGBA = (hex: string, alpha: number) => {
  const hexWithOutHash = hex.replace('#', '');
  const r = parseInt(hexWithOutHash.substring(0, 2), 16);
  const g = parseInt(hexWithOutHash.substring(2, 4), 16);
  const b = parseInt(hexWithOutHash.substring(4, 6), 16);
  const rgba = `rgba(${r},${g},${b},${alpha})`;
  return rgba;
};

export default convertHexToRGBA;
