/// <reference path="../typings/fb.d.ts" />

import { FB } from 'fb'
import { ipcMain, BrowserWindow } from 'electron'

import { FB_GET_POSTCOMMENTS_REQUEST, FB_GET_POSTCOMMENTS_RESPONSE, FB_LOGIN_REQUEST, FB_LOGIN_RESPONSE, FB_LOGOUT } from './fb-actions.types'
import { fbGetPostCommentsResponse, fbLoginResponse, IFbAction } from './fb-actions.creators'
import { settings } from './settings'

const redirectUrl = 'https://www.facebook.com/connect/login_success.html'

function getFbLoginUrl() {
  return `https://www.facebook.com/v2.11/dialog/oauth?
  client_id=${settings.fbClientId}&
  scope=${settings.fbScopes}&
  redirect_uri=${redirectUrl}&
  response_type=token,granted_scopes&
  display=popup`
}

function getFbLogoutUrl(accessToken: string) {
  return `https://www.facebook.com/logout.php?
  next=${redirectUrl}&
  access_token=${accessToken}`
}

function getFbAuthWindow(mainWindow: BrowserWindow) {
  return new BrowserWindow({
    width: 450,
    height: 300,
    show: false,
    parent: mainWindow,
    modal: true,
    webPreferences: { nodeIntegration: false },
  })
}

function getRegExValue(regexArray: string[]): string | null {
  return (regexArray && regexArray.length > 1) ? regexArray[ 1 ] : null
}

function getFbToken(url: string): [ string, string ] {
  const rawToken = /access_token=([^&]*)/.exec(url) || null
  const rawError = /\?error=(.+)$/.exec(url) || null
  return [ getRegExValue(rawToken), getRegExValue(rawError) ]
}

function registerFbLoginRequest(mainWindow: Electron.BrowserWindow) {
  ipcMain.on(FB_LOGIN_REQUEST, (event: any) => {
    const fbAuthWindow = getFbAuthWindow(mainWindow)
    fbAuthWindow.loadURL(getFbLoginUrl())
    fbAuthWindow.show()
    fbAuthWindow.webContents.on('did-get-redirect-request', (_: any, oldUrl: string, newUrl: string) => {
      const [ accessToken, error ] = getFbToken(newUrl)

      if (accessToken) {
        FB.options({version: 'v2.5'})
        FB.setAccessToken(accessToken)
        event.sender.send(FB_LOGIN_RESPONSE, fbLoginResponse(accessToken))
        fbAuthWindow.close()
        return
      }

      if (error) {
        event.sender.send(FB_LOGIN_RESPONSE, fbLoginResponse(null, error))
        fbAuthWindow.close()
        return
      }
    })
  })
}

function registerFbLogout(mainWindow: BrowserWindow) {
  ipcMain.on(FB_LOGOUT, () => {
    const fbAuthWindow = getFbAuthWindow(mainWindow)
    fbAuthWindow.webContents.session.clearStorageData()
    const accessToken = FB.getAccessToken()
    const url = getFbLogoutUrl(accessToken)
    fbAuthWindow.loadURL(url)
    fbAuthWindow.show()
    fbAuthWindow.webContents.on('did-get-redirect-request', () => {
      fbAuthWindow.close()
    })
  })
}

function registerFbGetPostComments() {
  ipcMain.on(FB_GET_POSTCOMMENTS_REQUEST, (event: any, action: IFbAction) => {
    const url = `${action.data.pageId}_${action.data.postId}/comments`
    console.log(url)
    FB.api(url, { fields: ['user_likes', 'message', 'message_tags' , 'comments', 'from{id,name}'] })
      .then((result: any) => {
        return event.sender.send(FB_GET_POSTCOMMENTS_RESPONSE, fbGetPostCommentsResponse(result))
      })
      .catch((error: any) => {
        console.error('error', error)
        return event.sender.send(FB_GET_POSTCOMMENTS_RESPONSE, fbGetPostCommentsResponse(null, error.message))})
  })
}

export function registerFbApi(mainWindow: BrowserWindow) {
  registerFbLoginRequest(mainWindow)
  registerFbLogout(mainWindow)
  registerFbGetPostComments()
}
