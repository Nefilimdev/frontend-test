import { PostsEntity } from './../../+state/posts.models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: PostsEntity | undefined;

  constructor() {}

  ngOnInit() {}
}
