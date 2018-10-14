// noinspection TsLint
import { autoUpdater, dialog } from "electron";
import packageConfig from "../../package.json";

export const setUpAutoUpdater = () => {
  const { version } = packageConfig;

  const updateFeed = "https://fourmi-releases.herokuapp.com/update";
  autoUpdater.setFeedURL({
    url: `${updateFeed}?version=${version}&platform=darwin`
  });

  setInterval(() => autoUpdater.checkForUpdates(), 1800000);
  autoUpdater.checkForUpdates();

  autoUpdater.on("error", () => {});

  autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
    // noinspection TsLint
    dialog.showMessageBox({
      buttons: ["Ok"],
      message: "Nouvelle mise à jour",
      detail: `Une nouvelle mise à jour est disponible. 
      Elle sera installée au prochain démarrage de l'application.\n\n
      Nouvelle version: v${releaseName}`
    });
  });
};
