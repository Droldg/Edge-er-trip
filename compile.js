// compile.js
const path = require('path');
const packager = require('electron-packager');

(async () => {
  try {
    // Kald electron-packager med de ønskede indstillinger
    const appPaths = await packager({
      // Sti til hovedmappen (hvor package.json og MesChrome.js ligger)
      dir: './',

      // Mappen, hvor de buildede filer skal ligge
      out: 'release-builds',

      // Platform & arkitektur: her for Windows 64-bit
      platform: 'win32',
      arch: 'x64',

      // Ikon (her wavy.ico i mappen img/)
      icon: path.join(__dirname, 'img', 'wavy.ico'),

      // Overskriv tidligere builds
      overwrite: true,

      // Navn på den eksekverbare fil
      executableName: 'MesChromeApp',
    });

    console.log('Appen blev pakket til en exe. Filerne ligger i:\n', appPaths);
  } catch (error) {
    console.error('Fejl ved pakning af appen:', error);
    process.exit(1);
  }
})();
