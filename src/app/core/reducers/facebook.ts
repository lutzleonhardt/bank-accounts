import { FacebookActions, FacebookActionTypes } from 'app/core/actions/facebook'
import { combineReducers } from '@ngrx/store'

export interface State {
  accessToken: string
  progress: number
}

export function accessToken(state: string = null, action: FacebookActions): typeof state {
  switch (action.type) {
    case FacebookActionTypes.LoginResponse:
      return action.accessToken

    case FacebookActionTypes.LogoutResponse:
      return null

    default:
      return state
  }
}

export function progress(state = 0, action: FacebookActions) {
  switch (action.type) {
    case FacebookActionTypes.LoginRequest:
      return state + 1

    case FacebookActionTypes.LoginResponse:
      return state - 1

    default:
      return state
  }
}

export const reducer = combineReducers<State>({
  accessToken,
  progress,
})

export const getAccessToken = (state: State) => state.accessToken
export const getProgress = (state: State) => state.progress
