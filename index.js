const electron = require("electron");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1440,
    height: 900,
    darkTheme: false,
    autoHideMenuBar: true,
    // titleBarStyle: 'customButtonsOnHover', frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html#`);
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });
  mainWindow.webContents.on('dom-ready', e => {
    mainWindow.webContents.insertCSS('html,body{ overflow: hidden; }');
  })
});
