export default (func, timeout = 500) => {
  let called = false;
  return (...args) => {
    if (!called) func.apply(this, args);
    called = true;
    setTimeout(() => {
      called = false;
    }, timeout);
  };
};
