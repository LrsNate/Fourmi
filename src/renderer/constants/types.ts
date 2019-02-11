import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../reducers";

export interface DBObject {
  _id: string;
}

export type Corpora = { [key: string]: Corpus };

export interface Corpus extends DBObject {
  title: string;
  epigramIds: string[];
}

export type Epigrams = { [key: string]: Epigram };

export interface Epigram extends DBObject {
  originId?: string;
  author: string;
  reference: string;
  title: string;
  meter: string;
  stanza: string;
  addressee: string;
  date: number | string;
  themes: string[];
  latinText: string;
  frenchText: string;
  notes: string;
}

// @ts-ignore
export const emptyEpigram: Epigram = {
  author: "",
  reference: "",
  title: "",
  meter: "",
  stanza: "",
  addressee: "",
  date: "",
  themes: [],
  latinText: "",
  frenchText: "",
  notes: ""
};

export type Dispatch = ThunkDispatch<void, RootState, Action>;
