import DataStore from 'nedb';

export const INITIALIZE_WORKS = 'INITIALIZE_WORKS';

export function initializeWorksAction() {
  const db = new DataStore({
    filename: '/Users/Nate/Documents/Martial/works.db',
    autoload: true,
  });

  return dispatch => db.find({}, (err, docs) => {
    console.log('dispatching');
    dispatch({
      type: INITIALIZE_WORKS,
      works: docs,
    });
  });
}
