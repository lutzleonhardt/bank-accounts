import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'

import {
  FB_GET_POSTCOMMENTS_REQUEST, FB_GET_POSTCOMMENTS_RESPONSE, FB_LOGIN_REQUEST, FB_LOGIN_RESPONSE,
  FB_LOGOUT,
} from '../../../../electron/fb-actions.types'
import { fbGetPostCommentsRequest, fbLoginRequest, fbLogout, IFbAction } from '../../../../electron/fb-actions.creators'

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

  public getPostComments(pageId: string, postId: string): Observable<any> {
    ipcRenderer.send(FB_GET_POSTCOMMENTS_REQUEST, fbGetPostCommentsRequest(pageId, postId))
    const promise = new Promise<any>((resolve, reject) =>
      ipcRenderer.on(FB_GET_POSTCOMMENTS_RESPONSE, (event: any, action: IFbAction) => {
        if (action.data.error) {
          return reject(action.data.error)
        } else {
          return resolve(action.data.result)
        }
      }))
    return Observable.from(promise)
  }
}
