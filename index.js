const electron = require("electron");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1440,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html#`);
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
});
