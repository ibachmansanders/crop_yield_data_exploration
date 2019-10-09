export default (value, { bin2, bin3, bin4, bin5 }) => {
  let color = '#006d2c';
  if (Number(value) < Number(bin5)) color = '#31a354';
  if (Number(value) < Number(bin4)) color = '#74c476';
  if (Number(value) < Number(bin3)) color = '#bae4b3';
  if (Number(value) < Number(bin2)) color = '#edf8e9';
  if (!value) color = '#0084A7';
  return color;
};
