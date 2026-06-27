const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 900,
    minHeight: 600,
    title: 'Quantum Math Engine',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // Optional preload script placeholder
    },
    // Make it look premium and native
    autoHideMenuBar: true,
    backgroundColor: '#0b0c10'
  });

  // Load the compiled Angular app index.html
  mainWindow.loadFile(path.join(__dirname, 'dist/frontend/browser/index.html'));

  // Open the DevTools (optional, uncomment for debugging)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  // On macOS it is common for applications to stay active until the user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
