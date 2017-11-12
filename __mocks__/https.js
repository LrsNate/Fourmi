export const get = (path, cb) => {
  expect(["downloadUrl", "errorUrl"]).toContain(path);

  if (path === "errorUrl") {
    return {
      on(event, cb) {
        expect(event).toBe("error");
        cb();
      }
    };
  }

  const response = {
    pipe(fileHandle) {
      expect(fileHandle.type).toBe("fileHandle");
    },
    on(event, cb) {
      expect(event).toBe("end");
      cb();
    }
  };

  cb(response);
};

export default { get };
