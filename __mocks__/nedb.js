function DataStore() {}

DataStore.prototype.find = (query, cb) => cb(null, ["a", "b", "c"]);

DataStore.prototype.insert = (doc, cb) => cb(doc);

export default DataStore;
