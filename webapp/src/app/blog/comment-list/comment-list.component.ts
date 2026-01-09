import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService, CommentPost } from '../blog.service';
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from '@angular/router';

//imports: [CommonModule, CommentItemComponent, CommentFormComponent],
@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports:[CommonModule, FormsModule, RouterModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() postId!: number;
  currentUserId = 1;
  comments: CommentPost[] = [];
  searchTerm: string = '';
  editingCommentId: number | null = null;
  editingComment: Partial<CommentPost> = {};
  expandedPostIds: Set<number> = new Set();
  visibleCommentsPostId: number | null = null;
  expandedPostId: Set<number> = new Set();
  comment: Partial<CommentPost> = { content: '', post: 0 };
  newComment: boolean = false;
  

  constructor(
    private blogService: BlogService, 
    private router: Router,) {}

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

  startEdit(comment:CommentPost): void{
    this.editingCommentId = comment.id;
    this.editingComment = { ...comment };
  }

  cancelEdit(): void {
    this.editingCommentId = null;
    this.editingComment = {};
    this.newComment = false;
  }

  collapseAll(): void {
    this.expandedPostIds.clear();
  }

  editComment(): void {
    if (this.editingCommentId && this.editingComment.id) {
      this.blogService.updateComment(this.editingCommentId, this.editingComment).subscribe({
        next: () => {
          alert('Comment updated successfully');
          this.cancelEdit();
          this.loadComments();
        },
        error: (error) => {
          console.error('Error updating comment:', error);
          alert('Error updating comment. Please try again.');
        }
      });
    }
  }

  deleteComment(id: number): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.blogService.deleteComment(id).subscribe({
        next: () => {
          alert('Post deleted successfully');
          this.loadComments();
        },
        error: (error) => {
          console.error('Error deleting comment:', error);
          alert('Error deleting comment. Please try again.');
        }
      });
    }
  }

  startAdd(): void{
    this.newComment = true;
    this.comment = {
      content: '',
      post:this.postId
  };
  }

  saveComment(): void {
    this.blogService.createComment(this.comment).subscribe({
      next: (newComment) => {
        alert('Comment created successfully');
        this.loadComments();
      },
      error: (error) => {
        console.error('Error creating comment:', error);
        alert('Error creating comment. Please try again.');
      }
    });
  }
}