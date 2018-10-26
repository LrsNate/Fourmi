// noinspection TsLint
import { app, BrowserWindow } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import packageConfig from "../../package.json";
import { setUpAutoUpdater } from "./autoUpdater";
import { initializeContextualMenu } from "./menu";

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
// @ts-ignore
let mainWindow: BrowserWindow | null;

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1000,
    height: 720,
    title: `Fourmi [v${packageConfig.version}]`
  });

  if (!isDevelopment) {
    setUpAutoUpdater();
  }

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  app.quit();
});

// create main BrowserWindow when electron is ready
app.on("ready", async () => {
  // if (isDevelopment) {
  //   await installExtensions();
  // }
  if (!isDevelopment) {
    initializeContextualMenu();
  }

  mainWindow = createMainWindow();
});
