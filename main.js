const {app, BrowserWindow} = require('electron');
const url = require('url');

function createWindow() {
    const mainWindow = new BrowserWindow({
        title: "TodoList",
        width: 800,
        height: 600,
        autoHideMenuBar: true,
    });

    const startUrl = url.format({
        pathname: require('path').join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    });

    mainWindow.loadURL(startUrl);

}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});