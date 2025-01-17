const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Opret et nyt BrowserWindow
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Indlæs det messenger
  mainWindow.loadURL('https://www.messenger.com');
}

// Når Electron er klart, opret vinduet
app.whenReady().then(() => {
  createWindow();
});

// Luk appen, når alle vinduer lukkes (undtagen på macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
