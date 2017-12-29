import {
  checkIfFileExists,
  checkIfFolderExists,
  createFolder,
  downloadFile,
  getDataFolderPath,
  getFilePath
} from "./files";

jest.mock("fs");
jest.mock("https");
jest.mock("mkdirp");
jest.mock("os");

describe("The getDataFolderPath function", () => {
  it("returns /Documents/Fourmi under the home directory", () => {
    expect(getDataFolderPath()).toBe("/home/test/Documents/Fourmi");
  });
});

describe("The getFilePath function", () => {
  it("returns a file path under the data folder", () => {
    expect(getFilePath("foo.txt")).toBe("/home/test/Documents/Fourmi/foo.txt");
  });
});

describe("The checkIfFolderExists function", () => {
  it("returns true if the folder exists", () => {
    return checkIfFolderExists("isDirectory").then(result => {
      expect(result).toBeTruthy();
    });
  });

  it("returns false if the folder does not exist", () => {
    return checkIfFolderExists("doesNotExist").then(result => {
      expect(result).toBeFalsy();
    });
  });

  it("removes any file that exists at the same path", () => {
    return checkIfFolderExists("isFile").then(result => {
      expect(result).toBeFalsy();
    });
  });
});

describe("The createFolder function", () => {
  it("creates a folder and resolves the promise", () => {
    return createFolder("doesNotExist").then(result => {
      expect(result).toBe("doesNotExist");
    });
  });
});

describe("The checkIfFileExists function", () => {
  it("returns true if the folder exists", () => {
    return checkIfFileExists("isFile").then(result => {
      expect(result).toBeTruthy();
    });
  });

  it("returns false if the folder does not exist", () => {
    return checkIfFileExists("doesNotExist").then(result => {
      expect(result).toBeFalsy();
    });
  });
});

describe("The downloadFile function", () => {
  it("downloads a file", () => {
    return downloadFile("downloadUrl", "downloadPath").then(path => {
      expect(path).toBe("downloadPath");
    });
  });

  it("deletes the file and rejects the promise on failure", () => {
    return downloadFile("errorUrl", "downloadPath").catch(path => {
      expect(path).toBe("downloadPath");
    });
  });
});
