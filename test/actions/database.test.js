describe("The ensureDatabaseFolderExists action", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("dispatches messages when the folder does not exist", () => {
    jest.doMock("../../src/renderer/lib/files", () => ({
      getDataFolderPath: () => "/foo/bar",
      checkIfFolderExists: () => Promise.resolve(false),
      createFolder: () => Promise.resolve(null)
    }));
    const dispatch = jest.fn(i => i);

    const {
      ensureDatabaseFolderExistsAction
    } = require("../../src/renderer/actions/database");

    ensureDatabaseFolderExistsAction()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "DATABASE_FOLDER_NOT_FOUND"
      });
      expect(dispatch).toHaveBeenCalledWith({ type: "DATABASE_FOLDER_READY" });
    });
  });

  it("dispatches messages when the folder exists", () => {
    jest.doMock("../../src/renderer/lib/files", () => ({
      getDataFolderPath: () => "/foo/bar",
      checkIfFolderExists: () => Promise.resolve(true),
      createFolder: () => Promise.resolve(null)
    }));
    const dispatch = jest.fn(i => i);

    const {
      ensureDatabaseFolderExistsAction
    } = require("../../src/renderer/actions/database");

    ensureDatabaseFolderExistsAction()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: "DATABASE_FOLDER_FOUND" });
      expect(dispatch).toHaveBeenCalledWith({ type: "DATABASE_FOLDER_READY" });
    });
  });
});

describe("The ensureDatabaseExists action", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("dispatches messages when the folder does not exist", () => {
    jest.doMock("../../src/renderer/lib/files", () => ({
      getDataFolderPath: () => "/foo/bar",
      checkIfFileExists: () => Promise.resolve(false),
      downloadFile: () => Promise.resolve(null)
    }));
    const dispatch = jest.fn(i => i);

    const {
      ensureDatabaseExistsAction
    } = require("../../src/renderer/actions/database");

    ensureDatabaseExistsAction()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "DATABASE_NOT_FOUND"
      });
      expect(dispatch).toHaveBeenCalledWith({ type: "DATABASE_READY" });
    });
  });

  it("dispatches messages when the folder exists", () => {
    jest.doMock("../../src/renderer/lib/files", () => ({
      getDataFolderPath: () => "/foo/bar",
      checkIfFileExists: () => Promise.resolve(true),
      downloadFile: () => Promise.resolve(null)
    }));
    const dispatch = jest.fn(i => i);

    const {
      ensureDatabaseExistsAction
    } = require("../../src/renderer/actions/database");

    ensureDatabaseExistsAction()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: "DATABASE_FOUND" });
      expect(dispatch).toHaveBeenCalledWith({ type: "DATABASE_READY" });
    });
  });
});
