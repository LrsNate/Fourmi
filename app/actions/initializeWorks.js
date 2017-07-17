export const INITIALIZE_WORKS = 'INITIALIZE_WORKS';

export function initializeWorksAction() {
  const works = [
    {"reference":"IX, 18","title":null,"latinText":"Foobar","author":"Martial","stanza":"Distique","meter":"Distique x 4","frenchText":"Foobar","addressee":null,"date":94,"_id":"01K5VE9VamcE9eXV"}, // eslint-disable-line
    {"reference":"II, 5","title":null,"latinText":"Foobar.","author":"Martial","stanza":"Distique","meter":"Distique x 4","frenchText":"Foo!.","addressee":null,"date":84,"_id":"02b96aNoDKNNgPMR"}, // eslint-disable-line
    {"reference":"XIV, 45","title":"Pila paganica","latinText":"Barbaz","author":"Martial","stanza":"Distique","meter":"Distique x 1","frenchText":"???","addressee":null,"date":85,"_id":"06NcUZe6ig8Ag0eY"} // eslint-disable-line
  ];

  return {
    type: INITIALIZE_WORKS,
    works,
  };
}
