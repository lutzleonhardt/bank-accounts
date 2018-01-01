import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { EffectsModule } from '@ngrx/effects'
import { FormsModule } from '@angular/forms'
import {
  MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatFormFieldModule,
  MatInputModule, MatTabsModule,
} from '@angular/material'
import { NgModule } from '@angular/core'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store'

import { AppComponent } from './app.component'
import { environment } from 'environments/environment'
import { metaReducers, reducers } from 'app/reducers'
import { FacebookService } from 'app/core/services/facebook.service'
import { FacebookEffects } from 'app/core/effects/facebook'
import { CommentsSearchModule } from 'app/core/components/comments-search/comments-search.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument({}) : [],
    EffectsModule.forRoot([ FacebookEffects ]),

    // Material UI
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,

    CommentsSearchModule,
  ],
  providers: [ FacebookService ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
