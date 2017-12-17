function DataStore() {}

DataStore.prototype.find = (query, cb) =>
  cb(null, [{ _id: "a" }, { _id: "b" }, { _id: "c" }]);

DataStore.prototype.update = (query, doc, options, cb) => cb(null, 1);

export default DataStore;
