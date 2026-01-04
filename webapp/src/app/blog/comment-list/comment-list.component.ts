import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService, CommentPost } from '../blog.service';
import { FormsModule } from "@angular/forms";

//imports: [CommonModule, CommentItemComponent, CommentFormComponent],
@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() postId!: number;
  comments: CommentPost[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    console.log('POST ID:', this.postId);
    this.loadComments();
  }

  loadComments() {
    this.blogService
      .getComment(this.postId)
      .subscribe(c => {
        console.log('COMMENTS:', c);
        this.comments = c;
      });
  }
}