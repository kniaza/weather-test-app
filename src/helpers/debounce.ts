function debounce(callback: Function, timeout = 300) {
  let timer: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, timeout);
  };
}

export { debounce };
