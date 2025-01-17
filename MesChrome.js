const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    // Tilføj ikon (forudsat at "wavy.png" ligger i "img"-mappen
    // i samme mappe som denne fil)
    icon: path.join(__dirname, 'img', 'wavy.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Indlæs Messenger
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
