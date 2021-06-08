const { ipcRenderer, contextBridge, BrowserWindow } = require('electron');
let os = require('os');

contextBridge.exposeInMainWorld('api', {
  cpuCount: os.cpus().length,
  getCpuUsage: (args) => ipcRenderer.invoke('get-cpu-used', args),
});