/**
 * [INPUT]: Has no dependencies
 * [OUTPUT]: Exports the recursive CatalogShape utility used to enforce locale parity
 * [POS]: Compile-time contract between the English baseline and every translated catalog
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

export type CatalogShape<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? { readonly [K in keyof T]: CatalogShape<T[K]> }
    : T extends object
      ? { readonly [K in keyof T]: CatalogShape<T[K]> }
      : T;
