import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogPost, BlogService } from '../blog.service';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})

export class PostItemComponent {
  @Input() post!: BlogPost;
  @Output() deleted = new EventEmitter<void>();

  expanded = false;
  editing = false;
  editedPost: Partial<BlogPost> = {};

  constructor(private blogService: BlogService) {}

  toggle(): void {
    this.expanded = !this.expanded;
  }

  startEdit(): void {
    this.editing = true;
    this.editedPost = { ...this.post };
  }

  cancelEdit(): void {
    this.editing = false;
    this.editedPost = {};
  }

  saveEdit(): void {
    if (!this.post.id) return;

    this.blogService
      .updatePost(this.post.id, this.editedPost)
      .subscribe(() => {
        this.editing = false;
      });
  }

  deletePost(): void {
    if (!confirm('Delete post?')) return;

    this.blogService
      .deletePost(this.post.id)
      .subscribe(() => {
        this.deleted.emit();
      });
  }
}
