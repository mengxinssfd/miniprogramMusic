export function debounce(func, delay) {
  console.log(this);
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      func(...args);
    }, delay);
  };
}