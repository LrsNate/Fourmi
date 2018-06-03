export const installExtensions = async () => {
  // noinspection TsLint
  const installer = require("electron-devtools-installer");
  // Waiting for redux@4 support
  // const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];
  const extensions = ["REACT_DEVELOPER_TOOLS"];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};
