import keyBy from "lodash/keyBy";
import each from "lodash/each";
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
      epigrams: keyBy(docs, "_id")
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

export const transformEpigramsAction = () => (dispatch, getState) => {
  const { epigrams } = getState().epigrams;

  each(epigrams, epigram => {
    const latinText = transformText(epigram.latinText);
    const frenchText = transformText(epigram.frenchText);
    const { vices, ...otherAttributes } = epigram;

    dispatch(
      saveEpigramAction({
        ...otherAttributes,
        themes: vices,
        latinText,
        frenchText
      })
    );
  });
};

const transformText = text => {
  if (!text) {
    return text;
  }

  const lines = text.split(/\n/);
  let result = "";

  each(lines, line => {
    result += `<p>${line}</p>`;
  });
  return result;
};
