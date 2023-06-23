export type Ok<T> = {
  ok: true;
  value: T;
};

export type Err<E> = {
  ok: false;
  error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export function Ok<T>(value: T): Ok<T> {
  return {
    ok: true,
    value,
  };
}

export function Err<E>(error: E): Err<E> {
  return {
    ok: false,
    error,
  };
}

export type Some<T> = {
  some: true;
  value: T;
};

export type None = {
  some: false;
};

export type Option<T> = Some<T> | None;

export function Some<T>(value: T): Some<T> {
  return {
    some: true,
    value,
  };
}

export const None: None = {
  some: false,
};

export function exhaust(
  _value: never,
  message = "Failed exhaustive check"
): never {
  throw new Error(message);
}
