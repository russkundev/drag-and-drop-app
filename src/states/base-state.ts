import { Listener } from "../types/listener";

export abstract class State<T> {
  listeners: Listener<T>[] = [];
  constructor() {}

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
