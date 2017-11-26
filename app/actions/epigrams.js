import DataStore from "nedb";

import {
  loadEpigramsType,
  saveEpigramType
} from "../constants/actions/epigrams";
import { getFilePath } from "../lib/files";

export const loadEpigramsAction = () => dispatch => {
  const db = new DataStore({
    filename: getFilePath("epigrams.db"),
    autoload: true
  });

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
  return dispatch({ type: saveEpigramType, epigram });
};
