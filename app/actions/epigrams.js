import DataStore from "nedb";

import { loadEpigramsType } from "../constants/actions/epigrams";
import { getFilePath } from "../lib/files";

// eslint-disable-next-line import/prefer-default-export
export const loadEpigramsAction = () => dispatch => {
  const db = new DataStore({
    filename: getFilePath("epigrams.db"),
    autoload: true
  });

  db.find({}, (err, docs) => {
    dispatch({
      type: loadEpigramsType,
      epigrams: docs
    });
  });
};
