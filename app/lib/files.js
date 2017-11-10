import * as fs from "fs";
import * as https from "https";
import * as mkdirp from "mkdirp";
import * as os from "os";

export const getDataFolderPath = () => `${os.homedir()}/Documents/Fourmi`;

export const checkIfFolderExists = folderPath => {
  return new Promise(resolve => {
    fs.stat(folderPath, (err, stats) => {
      if (!err && stats.isDirectory()) {
        resolve(true);
      } else if (!err && !stats.isDirectory()) {
        fs.unlink(folderPath, () => {
          resolve(false);
        });
      } else {
        resolve(false);
      }
    });
  });
};

export const createFolder = dataFolderPath => {
  return new Promise(resolve => {
    mkdirp.mkdirp(dataFolderPath, () => resolve());
  });
};

export const checkIfFileExists = filePath => {
  return new Promise(resolve => {
    fs.stat(filePath, err => {
      resolve(!err);
    });
  });
};

export const downloadFile = (fileUrl, destinationPath) => {
  return new Promise((resolve, reject) => {
    const fileHandle = fs.createWriteStream(destinationPath);

    https
      .get(fileUrl, response => {
        response.pipe(fileHandle);

        response.on("end", () => {
          fileHandle.end();
          resolve();
        });
      })
      .on("error", () => {
        fs.unlink(destinationPath, reject);
      });
  });
};
