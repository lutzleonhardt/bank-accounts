import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { State } from 'app/reducers'
import { Store } from '@ngrx/store'
import { GetPostComments } from 'app/core/actions/facebook'

@Component({
  selector: 'll-comments-search',
  templateUrl: './comments-search.component.html',
  styleUrls: [ './comments-search.component.scss' ],
})
export class CommentsSearchComponent implements OnInit {

  @ViewChild('inputPageId')
  private inputPageId: ElementRef

  @ViewChild('inputPostId')
  private inputPostId: ElementRef

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  public getPostComments() {
    const postId = this.inputPostId.nativeElement.value,
      pageId = this.inputPageId.nativeElement.value
    this.store.dispatch(new GetPostComments(pageId, postId))
  }

}
