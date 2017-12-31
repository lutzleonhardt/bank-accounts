import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'

import { FB_LOGIN_REQUEST, FB_LOGIN_RESPONSE, FB_LOGOUT } from '../../../../electron/fb-actions.types'
import { fbLoginRequest, fbLogout, IFbAction } from '../../../../electron/fb-actions.creators'

const w = window as any
const { ipcRenderer } = w.electron

@Injectable()
export class FacebookService {
  public logout() {
    ipcRenderer.send(FB_LOGOUT, fbLogout())
  }

  public login(): Observable<string> {
    ipcRenderer.send(FB_LOGIN_REQUEST, fbLoginRequest())
    const promise = new Promise<string>((resolve) =>
      ipcRenderer.on(FB_LOGIN_RESPONSE, (event: any, action: IFbAction) => resolve(action.data.accessToken)))
    return Observable.from(promise)
  }
}
