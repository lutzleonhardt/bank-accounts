import { Action } from '@ngrx/store'

export enum FacebookActionTypes {
  Login = '[Facebook] Login',
  LoginRequest = '[Facebook] Login Request',
  LoginResponse = '[Facebook] Login Response',
  Logout = '[Facebook] Logout',
  LogoutRequest = '[Facebook] Logout Request',
  LogoutResponse = '[Facebook] Logout Response',
  GetPostComments = '[Facebook] GetPostComments',
  GetPostCommentsRequest = '[Facebook] GetPostCommentsRequest',
  GetPostCommentsResponse = '[Facebook] GetPostCommentsResponse'
}

export class Login implements Action {
  readonly type = FacebookActionTypes.Login
}

export class LoginRequest implements Action {
  readonly type = FacebookActionTypes.LoginRequest
}

export class LoginResponse implements Action {
  readonly type = FacebookActionTypes.LoginResponse

  public constructor(public accessToken: string) {}
}

export class Logout implements Action {
  readonly type = FacebookActionTypes.Logout
}

export class LogoutRequest implements Action {
  readonly type = FacebookActionTypes.LogoutRequest
}

export class LogoutResponse implements Action {
  readonly type = FacebookActionTypes.LogoutResponse
}

export class GetPostComments implements Action {
  readonly type = FacebookActionTypes.GetPostComments

  public constructor(public pageId: string, public postId: string) {}
}

export class GetPostCommentsRequest implements Action {
  readonly type = FacebookActionTypes.GetPostCommentsRequest

  public constructor(public pageId: string, public postId: string) {}
}

export class GetPostCommentsResponse implements Action {
  readonly type = FacebookActionTypes.GetPostCommentsResponse

  public constructor(public result: any) {}
}

export type FacebookActions = Login | LoginRequest | LoginResponse | Logout | LogoutRequest | LogoutResponse | GetPostComments | GetPostCommentsRequest | GetPostCommentsResponse



