export const mkdirP = (path, cb) => {
  expect(path).toBe("doesNotExist");
  cb(path);
};

export default {
  mkdirP,
  mkdirp: mkdirP
};
