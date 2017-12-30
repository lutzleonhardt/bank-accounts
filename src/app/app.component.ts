import { ApplicationRef, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core'

import { FB_LOGIN_REQUEST, FB_LOGIN_RESPONSE, FB_LOGOUT } from '../../electron/fb-actions.types'
import { fbLoginRequest, fbLogout, IFbAction } from '../../electron/fb-actions.creators'

const w = window as any
const { ipcRenderer } = w.electron

@Component({
  selector: 'll-app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent {
  private accessToken: string

  public constructor(private zone: NgZone) {
  }

  public logout() {
    ipcRenderer.send(FB_LOGOUT, fbLogout())
    this.accessToken = null
  }

  public loginAsync() {
    ipcRenderer.send(FB_LOGIN_REQUEST, fbLoginRequest())
    ipcRenderer.on(FB_LOGIN_RESPONSE, (event: any, action: IFbAction) => {
      this.zone.run(() => {
        this.accessToken = action.data.accessToken
      })
    })
  }
}
