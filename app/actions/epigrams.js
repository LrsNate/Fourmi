import DataStore from "nedb";

import { loadEpigramsType, saveEpigramType } from "../constants/actions";
import { getFilePath } from "../lib/files";

let db;

const initializeDatabase = () => {
  db = new DataStore({
    filename: getFilePath("epigrams.db"),
    autoload: true
  });
};

export const loadEpigramsAction = () => dispatch => {
  initializeDatabase();

  return new Promise(resolve => {
    db.find({}, (err, docs) => resolve(docs));
  }).then(docs =>
    dispatch({
      type: loadEpigramsType,
      epigrams: docs
    })
  );
};

export const saveEpigramAction = epigram => dispatch => {
  return new Promise(resolve => {
    db.insert(epigram, (err, newDoc) => resolve(newDoc));
  }).then(epigram => dispatch({ type: saveEpigramType, epigram }));
};
