/* eslint-disable import/no-extraneous-dependencies */
import "babel-polyfill";
import { app } from "electron";
import { setUpAutoUpdater } from "./autoUpdater";
import { installExtensions } from "./devExtensions";
import { createMainWindow } from "./window";

const isDevelopment = process.env.NODE_ENV !== "production";

// Global reference to mainWindow
// Necessary to prevent win from being garbage collected
// eslint-disable-next-line no-unused-vars
let mainWindow;

app.on("window-all-closed", () => {
  app.quit();
});

app.on("ready", async () => {
  if (isDevelopment) {
    await installExtensions();
  } else {
    setUpAutoUpdater();
  }
  mainWindow = createMainWindow(isDevelopment);
});
