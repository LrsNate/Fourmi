import _ from "lodash";
import DataStore from "nedb";
import { Action, Dispatch } from "redux";
import { Corpora, Corpus } from "../constants/types";

import { getFilePath } from "../lib/files";

let db: DataStore | null = null;

const initializeDatabase = () => {
  db = new DataStore({
    autoload: true,
    filename: getFilePath("corpora.db")
  });
};

export const loadCorporaType = "corpora:load";

export interface LoadCorporaAction extends Action<string> {
  corpora: Corpora;
}

export const loadCorporaAction = () => (dispatch: Dispatch) => {
  initializeDatabase();

  return new Promise(resolve => {
    db!.find<Corpus>({}, (err, docs) => resolve(docs));
  }).then(docs =>
    dispatch({
      corpora: _.keyBy(docs, "_id"),
      type: loadCorporaType
    })
  );
};

export const saveCorpusType = "corpora:save";

export interface SaveCorpusAction extends Action<string> {
  corpus: Corpus;
}

export const saveCorpusAction = (corpus: Corpus) => (dispatch: Dispatch) => {
  return new Promise(resolve => {
    if (corpus._id) {
      db!.update({ _id: corpus._id }, corpus, {}, () => resolve(corpus));
    } else {
      db!.insert(corpus, (err, doc) => resolve(doc));
    }
  }).then(e => dispatch({ type: saveCorpusType, corpus: e }));
};

export const deleteCorpusType = "corpora:delete";

export interface DeleteCorpusAction extends Action<string> {
  id: string;
}

export const deleteCorpusAction = (id: string) => (dispatch: Dispatch) => {
  return new Promise(resolve => {
    db!.remove({ _id: id }, () => resolve());
  }).then(() => dispatch({ type: deleteCorpusType, id }));
};
