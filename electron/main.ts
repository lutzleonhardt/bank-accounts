import { app, BrowserWindow } from 'electron'
import * as url from 'url'
import { registerFbApi } from './facebook'

let win: any = null

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: { webSecurity: false },
  })

  registerFbApi(win)

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:4200')
    win.webContents.openDevTools()
  } else {
    win.loadURL(url.format({
      pathname: `${__dirname}/index.html`,
      protocol: 'file:',
      slashes: true,
    }))
  }

  // Remove window once app is closed
  win.on('closed', function () {
    win = null
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// ignore HMR at the moment
const m = module as any
if (m.hot) {
  m.hot.accept()
}

