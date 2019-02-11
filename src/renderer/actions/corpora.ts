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
