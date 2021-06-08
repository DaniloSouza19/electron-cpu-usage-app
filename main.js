const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const si = require('systeminformation');

function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
      nodeIntegration: true
    },
    autoHideMenuBar: true,
    title: 'CPU Usage',
    maximizable: false
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