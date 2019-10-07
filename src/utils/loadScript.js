// attaches scripts to the window
export default (src) => {
  console.log('loading Google Maps API');
  const ref = window.document.getElementsByTagName('script')[0] || window.document.getElementsByTagName('style')[0];
  const script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
};
