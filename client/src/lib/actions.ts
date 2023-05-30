export type ActionType<T, Err extends any = {}> =
  {
    success: true,
    result: T
  } |
  {
    success: false,
    error: Err
  }
