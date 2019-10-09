export default (string) => {
  if (!string) return '';
  if (typeof string !== 'string') return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};
