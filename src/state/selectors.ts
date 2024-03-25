import { IAppState } from "./types.ts";
import { initState } from "./reducer.ts";

export class Selectors {
  get products() {
    return this.state.products || [];
  }

  get isLoading() {
    return this.state.isLoading;
  }

  get isInit() {
    return this.state.isInit;
  }

  constructor(private readonly state: IAppState = initState) {}
}
