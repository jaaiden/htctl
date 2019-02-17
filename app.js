const { app, BrowserWindow, ipcMain } = require('electron')
const settings = require("./settings")
let win

function createWindow () {
    win = new BrowserWindow({ width: settings.width, height: settings.height, frame: false, titleBarStyle: 'hidden', fullscreen: settings.isFullscreen })
    win.loadFile('pages/index.html')
    win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    /*
    if (process.platform !== 'darwin') {
        app.quit()
    }
    */
    app.quit()
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})