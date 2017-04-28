"use strict";

if (!process.versions.nw) {
  const electron = require("electron");
  const app = electron.app;
  const BrowserWindow = electron.BrowserWindow;

    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow;
  let preloader;

  const options = process.argv;

  if (options.indexOf("logcrypto") !== -1) {
    global.sharedObject = { logcrypto: true };
  } else {
    global.sharedObject = { logcrypto: false };
  }

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 800, height: 600,
      resizable: false,
      frame: false,
      toolbar: false,
      show: false
    });

    preloader = new BrowserWindow({
      width: 496, height: 149,
      resizable: false,
      frame: false,
      toolbar: false,
      show: false
    });

    mainWindow.loadURL(`file://${__dirname}/Trusted_eSign/index.html`);
    preloader.loadURL(`file://${__dirname}/Trusted_eSign/preloader_index.html`);

    if (options.indexOf("devtools") !== -1) {
      mainWindow.webContents.openDevTools();
    }

    preloader.webContents.on("did-finish-load", () => {
      preloader.show();
    });

    preloader.on("close", () => {
      preloader = null;
    });

    mainWindow.webContents.on("did-finish-load", () => {
      preloader.close();
      mainWindow.show();
    });

    mainWindow.on("close", () => {
      mainWindow = null;
    });
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createWindow);

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {

    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });

  const shouldQuit = app.makeSingleInstance(() => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });

  if (shouldQuit) {
    app.quit();
  }
} else {
  window.gui.Window.open("./Trusted_eSign/index.html", {
    position: "center",
    width: 800,
    height: 600,
    frame: false,
    resizable: false,
    show: false
  }, () => { });
}
