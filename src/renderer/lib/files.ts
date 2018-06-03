import fs from "fs";
import https from "https";
import mkdirp from "mkdirp";
import os from "os";

export const getDataFolderPath = () => `${os.homedir()}/Documents/Fourmi`;

export const getFilePath = (filename: string) =>
  `${getDataFolderPath()}/${filename}`;

export const checkIfFolderExists = (folderPath: string) =>
  new Promise(resolve => {
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

export const createFolder = (dataFolderPath: string) =>
  new Promise(resolve => {
    mkdirp(dataFolderPath, path => resolve(path));
  });

export const checkIfFileExists = (filePath: string): Promise<boolean> =>
  new Promise(resolve => {
    fs.stat(filePath, err => {
      resolve(!err);
    });
  });

export const downloadFile = (fileUrl: string, destinationPath: string) =>
  new Promise((resolve, reject) => {
    const fileHandle = fs.createWriteStream(destinationPath);

    https
      .get(fileUrl, response => {
        response.pipe(fileHandle);

        response.on("end", () => {
          fileHandle.end();
          resolve(destinationPath);
        });
      })
      .on("error", () => {
        fs.unlink(destinationPath, () => {
          reject(destinationPath);
        });
      });
  });
