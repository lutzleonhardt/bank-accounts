import { storeFreeze } from 'ngrx-store-freeze'
import { Action, ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store'
import { environment } from 'environments/environment'
import * as fromFacebook from '../core/reducers/facebook'
import { getAccessToken } from 'app/core/reducers/facebook'

export interface State {
  facebook: fromFacebook.State
}

export const reducers: ActionReducerMap<State> = {
  facebook: fromFacebook.reducer,
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: Action): State {
    console.groupCollapsed(action.type)
    // console.log('before state', state)
    console.log('action', action)
    const afterState = reducer(state, action)
    console.log('after state', afterState)
    console.groupEnd()
    return afterState
  }
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [ logger, storeFreeze ]
  : []

// selectors
export const getFacebookState = createFeatureSelector<fromFacebook.State>('facebook')
export const getFacebookAccessToken = createSelector(getFacebookState, fromFacebook.getAccessToken)
export const getFacebookProgress = createSelector(getFacebookState, fromFacebook.getProgress)
