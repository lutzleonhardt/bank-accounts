import { Action } from '@ngrx/store'

export enum FacebookActionTypes {
  Login = '[Facebook] Login',
  LoginRequest = '[Facebook] Login Request',
  LoginResponse = '[Facebook] Login Response',
  Logout = '[Facebook] Logout',
  LogoutRequest = '[Facebook] Logout Request',
  LogoutResponse = '[Facebook] Logout Response'
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

export type FacebookActions = Login | LoginRequest | LoginResponse | Logout | LogoutRequest | LogoutResponse



