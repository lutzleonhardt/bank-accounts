import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'

import {
  FacebookActionTypes, GetPostComments, GetPostCommentsRequest, GetPostCommentsResponse, Login, LoginRequest, LoginResponse, Logout, LogoutRequest,
  LogoutResponse,
} from 'app/core/actions/facebook'
import { FacebookService } from 'app/core/services/facebook.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class FacebookEffects {

  // Login

  @Effect()
  private loginEffect$ = this.actions$
                             .ofType(FacebookActionTypes.Login)
                             .map((action: Login) => new LoginRequest())

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
                              .map((action: Logout) => new LogoutRequest())

  @Effect()
  private logoutRequestEffect$ = this.actions$
                                     .ofType(FacebookActionTypes.LogoutRequest)
                                     .do((action: LogoutRequest) => this.fb.logout())
                                     .map((action: LogoutRequest) => new LogoutResponse())

  // Post Comments

  @Effect()
  private postCommentsEffect$ = this.actions$
                                    .ofType(FacebookActionTypes.GetPostComments)
                                    .map((action: GetPostComments) => new GetPostCommentsRequest(action.pageId, action.postId))

  @Effect()
  private postCommentsRequestEffect$ = this.actions$
                                           .ofType(FacebookActionTypes.GetPostCommentsRequest)
                                           .switchMap((action: GetPostCommentsRequest) => this.fb.getPostComments(action.pageId, action.postId)
                                                                                              .catch((err: any) => {
                                                                                                console.error(err)
                                                                                                return Observable.from([ null ])
                                                                                              }))
                                           .map((result: any) => new GetPostCommentsResponse(result))

  constructor(private fb: FacebookService,
              private actions$: Actions) { }
}
