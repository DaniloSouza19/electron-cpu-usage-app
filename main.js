const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const si = require('systeminformation');

function createWindow () {
  const win = new BrowserWindow({
    width: 250,
    height: 250,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundColor: '#191622',
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    autoHideMenuBar: true,
    title: 'CPU Usage',
    alwaysOnTop: true,
    maximizable: false,
    resizable: false
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows() === 0) {
      createWindow();
    }
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

ipcMain.handle('get-cpu-used', async (event, args) => {
  let usage = await si.currentLoad();

  return usage;
})