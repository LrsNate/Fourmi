export const createWriteStream = path => {
  expect(path).toBe("downloadPath");
  return { type: "fileHandle", end: () => null };
};

export const stat = (path, cb) => {
  expect(["isDirectory", "isFile", "doesNotExist"]).toContain(path);

  switch (path) {
    case "isDirectory":
      cb(false, { isDirectory: () => true });
      break;
    case "isFile":
      cb(false, { isDirectory: () => false });
      break;
    case "doesNotExist":
      cb(true, {});
  }
};

export const unlink = (path, cb) => {
  expect(["isFile", "downloadPath"]).toContain(path);
  cb();
};

export default { createWriteStream, stat, unlink };
