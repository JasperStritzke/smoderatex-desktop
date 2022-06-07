const path = require('path')
const {app, BrowserWindow, Menu} = require('electron');

const isDev = process.env.IS_DEV === "true";
const isMac = process.platform === 'darwin'

const template = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services'},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideOthers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'},
            ...(isDev ? [{role: "reload"}, {role: "toggleDevTools"}] : [])
        ]
    }] : []),
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'selectAll'},
        ]
    },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        minWidth: 700,
        height: 600,
        minHeight: 500,
        webPreferences: {
            //preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            devTools: isDev,
        },
        titleBarStyle: 'hidden',
        show: false,
    });

    mainWindow.once("ready-to-show", () => setTimeout(() => mainWindow.show(), 50))

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../dist/index.html')}`
    );
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
