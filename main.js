"use strict";

const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');


function createWindow() {
    const mainWindow = new BrowserWindow({
        title: "TodoList",
        width: 1100,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            webSecurity: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        }
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    });

    mainWindow.loadURL(startUrl);
    //mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
