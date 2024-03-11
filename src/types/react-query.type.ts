import { UseQueryOptions } from "@tanstack/react-query";
import { Undefinable } from "@/types/nullable.type";

export type QueryParams = {
  [key: string]: string | number | boolean | undefined;
};
export type QueryKeyT = [string, Undefinable<object>];
export type PostQueryKeyT = [string, Undefinable<object>, Undefinable<object>];
export type ReactQueryOptionsType<T> = UseQueryOptions<T, Error, T, QueryKeyT>;
