export type AppendProps<T, U> = T & U;
export type Pretty<T> = { [P in keyof T]: T[P] } & unknown;
