export type AppendProps<T, U extends object> = T & U;
export type Pretty<T> = { [P in keyof T]: T[P] } & unknown;
