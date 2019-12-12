const electron = require("electron");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1350,
    height: 900,
    darkTheme: false,
    icon: __dirname + '/assets/icon.png',
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
  });

  app.on('browser-window-focus', () => {
    // console.log('focus');
    mainWindow.webContents.send("app:focus");
  });

  app.on('browser-window-blur', () => {
    // console.log('blur');
    mainWindow.webContents.send("app:blur");
  });

});
