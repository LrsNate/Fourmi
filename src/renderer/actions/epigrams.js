import keyBy from 'lodash/keyBy'
import DataStore from "nedb";

import {
  loadEpigramsType,
  saveEpigramType,
  searchEpigramsType
} from "../constants/actions";
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
      epigrams: keyBy(docs, '_id')
    })
  );
};

export const saveEpigramAction = epigram => dispatch => {
  return new Promise(resolve => {
    db.update({ _id: epigram._id }, epigram, { upsert: true }, () =>
      resolve(epigram)
    );
  }).then(epigram => dispatch({ type: saveEpigramType, epigram }));
};
