import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Login, Logout } from 'app/core/actions/facebook'
import { Observable } from 'rxjs/Observable'

import { getFacebookAccessToken, getFacebookProgress, State } from 'app/reducers'

@Component({
  selector: 'll-app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private accessToken$: Observable<string>
  private progess$: Observable<number>

  public constructor(private store: Store<State>) {
    this.accessToken$ = this.store.select(getFacebookAccessToken)
    this.progess$ = this.store.select(getFacebookProgress)
  }

  public login() {
    this.store.dispatch(new Login())
  }

  public logout() {
    this.store.dispatch(new Logout())
  }
}
