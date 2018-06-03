import { Epigram } from "../../constants/types";

export class EpigramsState {
  public readonly isLoaded: boolean;
  public readonly epigrams: Epigram[];

  public constructor() {
    this.isLoaded = false;
    this.epigrams = [];
  }
}

export default function epigrams(state = new EpigramsState(), action: object) {
  return state;
}
