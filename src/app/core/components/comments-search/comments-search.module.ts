import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule,
} from '@angular/material'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommentsSearchComponent } from 'app/core/components/comments-search/comments-search.component'
import { StoreModule } from '@ngrx/store'

@NgModule({
  declarations: [
    CommentsSearchComponent,
  ],
  exports: [
    CommentsSearchComponent,
  ],
  imports: [
    FormsModule,

    // ngrx
    StoreModule,

    // Material UI
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
})
export class CommentsSearchModule {
}
