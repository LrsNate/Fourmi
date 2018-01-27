// eslint-disable-next-line import/no-extraneous-dependencies
import { app, Menu } from "electron";

export const initializeContextualMenu = () => {
  const template = [
    {
      label: "Application",
      submenu: [
        { label: "À propos", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        {
          label: "Quitter",
          accelerator: "Command+Q",
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Éditer",
      submenu: [
        { label: "Annuler", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        {
          label: "Restaurer",
          accelerator: "Shift+CmdOrCtrl+Z",
          selector: "redo:"
        },
        { type: "separator" },
        { label: "Couper", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copier", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Coller", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Tout sélectionner",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
