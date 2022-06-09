type CallbackType<T> = () => Promise<T>;

type QueueItemType<T> = {
  callback: CallbackType<T>;
  resolve(result: T): void;
};

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

async function withQueue<T>(callback: CallbackType<T>): Promise<T> {
  return new Promise<T>(resolve => {
    callbackQueue.push({ callback, resolve });

    // trigger executeNextCallback() when callback queue was empty before
    if (callbackQueue.length === 1) {
      executeNextCallback();
    }
  });
}

export default withQueue;
