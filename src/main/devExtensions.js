/* eslint-disable import/no-extraneous-dependencies */

export const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};
