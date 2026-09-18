import { useReducer } from "react";

type Updater<T> = T | ((prev: T) => T);

function isUpdaterFn<T>(next: Updater<T>): next is (prev: T) => T {
  return typeof next === "function";
}

// useState's setter accepts either a plain value or an updater function (lesson 22).
// This reducer reproduces exactly that behavior: if it's handed a function, call it
// with the previous state to get the next state; otherwise use the value as-is.
function stateReducer<T>(state: T, action: Updater<T>): T {
  return isUpdaterFn(action) ? action(state) : action;
}

// A hand-rolled version of useState, built entirely out of useReducer, to show that
// useState isn't a separate primitive - it's a reducer whose "action" is just the
// next value (or a function producing it).
export function useMyState<T>(initial: T): [T, (next: Updater<T>) => void] {
  return useReducer(stateReducer<T>, initial);
}
