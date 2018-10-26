import _ from "lodash";
import DataStore from "nedb";
import { Action, Dispatch } from "redux";

import { Epigram } from "../constants/types";
import { getFilePath } from "../lib/files";

let db: DataStore | null = null;

const initializeDatabase = () => {
  db = new DataStore({
    autoload: true,
    filename: getFilePath("epigrams.db")
  });
};

export const loadEpigramsType = "epigrams:load";

export interface LoadEpigramsAction extends Action<string> {
  epigrams: { [key: string]: Epigram };
}

export const loadEpigramsAction = () => (dispatch: Dispatch) => {
  initializeDatabase();

  return new Promise(resolve => {
    db!.find<Epigram>({}, (err, docs) => resolve(docs));
  }).then(docs =>
    dispatch({
      epigrams: _.keyBy(docs, "_id"),
      type: loadEpigramsType
    })
  );
};

export const saveEpigramType = "epigrams:save";

export interface SaveEpigramAction extends Action<string> {
  epigram: Epigram;
}

export const saveEpigramAction = (epigram: Epigram) => (dispatch: Dispatch) => {
  return new Promise(resolve => {
    if (epigram._id) {
      db!.update({ _id: epigram._id }, epigram, {}, () => resolve(epigram));
    } else {
      db!.insert(epigram, (err, doc) => resolve(doc));
    }
  }).then(e => dispatch({ type: saveEpigramType, epigram: e }));
};
