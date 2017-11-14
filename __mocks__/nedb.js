function DataStore() {}

DataStore.prototype.find = (query, cb) => cb(null, ["a", "b", "c"]);

export default DataStore;
