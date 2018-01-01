import { FB_GET_POSTCOMMENTS_RESPONSE, FB_LOGIN_REQUEST, FB_LOGIN_RESPONSE, FB_LOGOUT } from './fb-actions.types'

export interface IFbAction {
  type: string
  data?: any
  error?: string
}

export function fbLoginRequest(): IFbAction {
  return { type: FB_LOGIN_REQUEST }
}

export function fbLoginResponse(accessToken: string, error?: string): IFbAction {
  return {
    type: FB_LOGIN_RESPONSE,
    data: { accessToken },
    error,
  }
}

export function fbLogout() {
  return { type: FB_LOGOUT }
}

export function fbGetPostCommentsRequest(pageId: string, postId: string): IFbAction {
  return {
    data: {
      pageId,
      postId,
    },
    type: FB_LOGIN_REQUEST,
  }
}

export function fbGetPostCommentsResponse(result: any, error?: string): IFbAction {
  return {
    type: FB_GET_POSTCOMMENTS_RESPONSE,
    data: { result, error },
    error,
  }
}
