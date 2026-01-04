import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from '../blog.service';
import { CommentListComponent } from "../comment-list/comment-list.component";

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CommentListComponent
],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  searchTerm: string = '';
  editingPostId: number | null = null;
  editingPost: Partial<BlogPost> = {};
  expandedPostIds: Set<number> = new Set();
  visibleCommentsPostId: number | null = null;
  expandedPostId: Set<number> = new Set();

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.blogService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.filterPosts();
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        alert('Error loading posts. Please try again.');
      }
    });
  }

  toggleExpand(id: number): void {
    if (this.expandedPostIds.has(id)) {
      this.expandedPostIds.delete(id);
    } else {
      this.expandedPostIds.add(id);
    }
  }


  toggleComments(postId: number) {
    if (this.visibleCommentsPostId === postId) {
      this.visibleCommentsPostId = null; 
    } else {
      this.visibleCommentsPostId = postId; 
    }
  }


  isExpanded(id: number): boolean {
    return this.expandedPostIds.has(id);
  }

  isCommentExpanded(id: number): boolean {
    return this.expandedPostIds.has(id);
  }

  startEdit(post: BlogPost): void {
    this.editingPostId = post.id;
    this.editingPost = { ...post };
  }

  saveEdit(): void {
    if (this.editingPostId && this.editingPost.id) {
      this.blogService.updatePost(this.editingPostId, this.editingPost).subscribe({
        next: () => {
          alert('Post updated successfully');
          this.cancelEdit();
          this.loadPosts();
        },
        error: (error) => {
          console.error('Error updating post:', error);
          alert('Error updating post. Please try again.');
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingPostId = null;
    this.editingPost = {};
  }

  collapseAll(): void {
    this.expandedPostIds.clear();
  }

  deletePost(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.blogService.deletePost(id).subscribe({
        next: () => {
          alert('Post deleted successfully');
          this.loadPosts();
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          alert('Error deleting post. Please try again.');
        }
      });
    }
  }

  // //COMMENT
  // loadComment(): void {
  //   this.blogService.getComments().subscribe({
  //     next: (comments) => {
  //       this.comments = comments;
  //       this.filterPosts();
  //     },
  //     error: (error) => {
  //       console.error('Error loading comments:', error);
  //       alert('Error loading comments. Please try again.');
  //     }
  //   });
  // }

      //FILTER
  filterPosts(): void {
    this.cancelEdit();
    this.collapseAll();

    this.blogService
      .getPostsFiltered(undefined, this.searchTerm)
      .subscribe(posts => {
        this.filteredPosts = posts
      })
  }
}

