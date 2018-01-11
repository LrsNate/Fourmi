/* eslint-disable import/no-extraneous-dependencies */
import { BrowserWindow } from "electron";
import packageConfig from "../../package.json";

export const createMainWindow = isDevelopment => {
  const window = new BrowserWindow({
    title: `Fourmi [v${packageConfig.version}]`
  });

  const url = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : `file://${__dirname}/index.html`;

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  window.loadURL(url);

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
};
