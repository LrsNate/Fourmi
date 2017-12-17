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
    db.update(
      { _id: epigram._id },
      epigram,
      { upsert: true },
      (err, numAffected) => {
        if (err || numAffected === 0) {
          throw `Something went wrong in saveEpigram: ${err}`;
        }
        resolve(epigram);
      }
    );
  }).then(epigram => dispatch({ type: saveEpigramType, epigram }));
};
