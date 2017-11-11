beforeEach(() => {
  jest.resetModules();
});

describe("The getDataFolderPath function", () => {
  it("returns /Documents/Fourmi under the home directory", () => {
    jest.doMock("os", () => ({
      homedir: () => "/home/test"
    }));
    const { getDataFolderPath } = require("../../app/lib/files");

    const path = getDataFolderPath();

    expect(path).toBe("/home/test/Documents/Fourmi");
  });
});

describe("The checkIfFolderExists function", () => {
  it("returns true if the folder exists", () => {
    jest.doMock("fs", () => ({
      stat(path, cb) {
        expect(path).toBe("somePath");
        cb(false, { isDirectory: () => true });
      }
    }));
    const { checkIfFolderExists } = require("../../app/lib/files");

    checkIfFolderExists("somePath").then(result => {
      expect(result).toBeTruthy();
    });
  });

  it("returns false if the folder does not exist", () => {
    jest.doMock("fs", () => ({
      stat(path, cb) {
        expect(path).toBe("somePath");
        cb(true, {});
      }
    }));
    const { checkIfFolderExists } = require("../../app/lib/files");

    checkIfFolderExists("somePath").then(result => {
      expect(result).toBeFalsy();
    });
  });

  it("returns false if the folder does not exist", () => {
    jest.doMock("fs", () => ({
      stat(path, cb) {
        expect(path).toBe("somePath");
        cb(true, {});
      }
    }));
    const { checkIfFolderExists } = require("../../app/lib/files");

    checkIfFolderExists("somePath").then(result => {
      expect(result).toBeFalsy();
    });
  });

  it("removes any file that exists at the same path", () => {
    jest.doMock("fs", () => ({
      stat(path, cb) {
        expect(path).toBe("somePath");
        cb(false, { isDirectory: () => false });
      },
      unlink(path, cb) {
        expect(path).toBe("somePath");
        cb();
      }
    }));
    const { checkIfFolderExists } = require("../../app/lib/files");

    checkIfFolderExists("somePath").then(result => {
      expect(result).toBeFalsy();
    });
  });
});
