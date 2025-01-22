// compileLinux.js
const path = require('path');
const packager = require('electron-packager');
const installer = require('electron-installer-debian');

(async () => {
  try {
    // 1) Byg appen til Linux
    const appPaths = await packager({
      // Mappen med din package.json, main-fil mv.
      dir: './',

      // Hvor skal build-output ligge?
      out: 'release-builds',

      // Platform & arkitektur for Linux
      platform: 'linux',
      arch: 'x64',

      // Overskriv tidligere builds
      overwrite: true,

      // Eksecutable navn
      executableName: 'MesChromeApp',

      // Ikon til Linux kan være .png
      // (OBS: For bedst resultat, brug en .png i ~512x512 eller tilsvarende)
      icon: path.join(__dirname, 'img', 'wavy.png')
    });

    console.log('Electron-app pakket til Linux. Filerne ligger i:\n', appPaths[0]);

    // 2) Lav en .deb-pakke med electron-installer-debian
    const buildPath = appPaths[0]; // Mappe hvor electron-packager lagde output
    const debOptions = {
      src: buildPath,
      dest: path.join(__dirname, 'release-deb'),
      arch: 'amd64', // passer til x64
      icon: path.join(__dirname, 'img', 'wavy.png'),  // Icon til .deb
      categories: ['Utility'], // Debian-menu-kategori
      // Eventuelt flere metadata: description, maintainer, version, etc.
    };

    const debResult = await installer(debOptions);
    console.log('Debian-pakke genereret:', debResult);
    console.log('Du finder .deb-filen i release-deb/-mappen.');
  } catch (error) {
    console.error('Fejl ved pakning af appen til .deb:', error);
    process.exit(1);
  }
})();
