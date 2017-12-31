import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

import { FacebookActionTypes, Login, LoginRequest, LoginResponse, Logout, LogoutRequest, LogoutResponse } from 'app/core/actions/facebook'
import { FacebookService } from 'app/core/services/facebook.service'

@Injectable()
export class FacebookEffects {

  // Login

  @Effect()
  private loginEffect$ = this.actions$
                             .ofType(FacebookActionTypes.Login)
                             .map((action: Login) => {
                               return new LoginRequest()
                             })

  @Effect()
  private loginRequestEffect$ = this.actions$
                                    .ofType(FacebookActionTypes.LoginRequest)
                                    .switchMap((action: LoginRequest) => {
                                      return this.fb.login()
                                                 .map(accessToken => new LoginResponse(accessToken))
                                    })

  // Logout

  @Effect()
  private logoutEffect$ = this.actions$
                              .ofType(FacebookActionTypes.Logout)
                              .map((action: Logout) => {
                                return new LogoutRequest()
                              })

  @Effect()
  private logoutRequestEffect$ = this.actions$
                                     .ofType(FacebookActionTypes.LogoutRequest)
                                     .do((action: LogoutRequest) => this.fb.logout())
                                     .map((action: LogoutRequest) => {
                                       return new LogoutResponse()
                                     })

  constructor(private fb: FacebookService,
              private actions$: Actions) { }
}
