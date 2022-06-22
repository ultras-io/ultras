export type ListenerCallbackType<T> = (
  data: T
) => void | Promise<void> | PromiseLike<void>;
