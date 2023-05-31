export type ActionType<T, Err extends any = {message: string}> =
  {
    success: true,
    result: T
  } |
  {
    success: false,
    error: Err
  }
