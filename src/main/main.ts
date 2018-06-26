import { app, BrowserWindow, screen } from 'electron';

const isProduction = process.env.NODE_ENV === 'production';

let window: BrowserWindow | null;

app.on('ready', () => {
    window = new BrowserWindow({
        x: 0,
        y: 0,
        ...screen.getPrimaryDisplay().workAreaSize,
    });

    if (isProduction) {
        window.loadFile('renderer/index.html');
    } else {
        window.loadURL('http://localhost:4200');
    }

    window.on('closed', () => (window = null));
});

app.on('window-all-closed', () => app.quit());
