type CallbackType<T> = () => Promise<T>;

type QueueItemType<T> = {
  callback: CallbackType<T>;
  resolve(result: T): void;
};

function buildWithQueue() {
  const callbackQueue: Array<QueueItemType<any>> = [];

  function executeNextCallback<T>() {
    if (callbackQueue.length === 0) {
      return;
    }

    const { callback, resolve } = callbackQueue[0];
    callback().then((result: T) => {
      resolve(result);

      callbackQueue.shift();
      executeNextCallback();
    });
  }

  function withQueue<T>(callback: CallbackType<T>): Promise<T> {
    return new Promise<T>(resolve => {
      callbackQueue.push({ callback, resolve });

      // trigger executeNextCallback() when callback queue was empty before
      if (callbackQueue.length === 1) {
        executeNextCallback();
      }
    });
  }

  return withQueue;
}

export default buildWithQueue;
