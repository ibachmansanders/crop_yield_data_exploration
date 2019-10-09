export default (tick) => {
  const value = Number(tick);
  if (value < 9999) return value.toLocaleString();
  if (value < 1000000) return `${Math.round(value / 1000)}K`;
  if (value < 10000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value < 1000000000) return `${Math.round((value / 1000000))}M`;
  if (value < 1000000000000) return `${Math.round((value / 1000000000))}B`;
  return tick;
};
