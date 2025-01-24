const { app, BrowserWindow, session } = require('electron');
const path = require('path');

// Sæt sprogindstilling til dansk (Chromium)
app.commandLine.appendSwitch('lang', 'da');

// Tving Accept-Language header til "da,en;q=0.8"
function forceDanishLocale() {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Accept-Language'] = 'da,en;q=0.8';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
}


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    icon: path.join(__dirname, 'img', 'wavy.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Indlæs Messenger
  mainWindow.loadURL('https://www.messenger.com');
}

// Når Electron er klart, sætter vi sprog + loader extension + opretter vinduet
app.whenReady().then(async () => {
  forceDanishLocale();


  createWindow();
});

// Luk appen, når alle vinduer lukkes (undtagen på macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
