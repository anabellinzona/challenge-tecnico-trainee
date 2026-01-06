import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost, CategoryPost } from '../blog.service';
import { CommentListComponent } from "../comment-list/comment-list.component";
import { CategorySelectorComponent } from "../category-selector/category-selector.component";

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CommentListComponent,
    CategorySelectorComponent
],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  categories: CategoryPost[] = [];
  filteredPosts: BlogPost[] = [];
  searchTerm: string = '';
  editingPostId: number | null = null;
  editingPost: Partial<BlogPost> = {};
  expandedPostIds: Set<number> = new Set();
  visibleCommentsPostId: number | null = null;
  expandedPostId: Set<number> = new Set();
  commentsShow: boolean = false;
  visibleCategoriesPostId: number | null = null;

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

toggleCategories(postId: number) {
  console.log('toggle categories', postId);
  if (this.visibleCategoriesPostId === postId) {
    this.visibleCategoriesPostId = null;
  } else {
    this.visibleCategoriesPostId = postId;
  }
}


  isExpanded(id: number): boolean {
    return this.expandedPostIds.has(id);
  }

  isCommentExpanded(id: number): void {
    this.commentsShow = true;
  }

  startEdit(post: BlogPost): void {
    this.editingPostId = post.id;
    this.editingPost = { ...post };
  }

  loadCategories(): void {
    this.blogService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error(err)
    });
  }

  isCategorySelected(categoryId: number): boolean {
    return this.editingPost?.category_ids?.includes(categoryId) ?? false;
  }

  onCategoryChange(event: Event, categoryId: number): void {
    const checkbox = event.target as HTMLInputElement;

    if (!this.editingPost.category_ids) {
      this.editingPost.category_ids = [];
    }

    if (checkbox.checked) {
      this.editingPost.category_ids.push(categoryId);
    } else {
      this.editingPost.category_ids = this.editingPost.category_ids.filter(
        id => id !== categoryId
      );
    }
  }

  // updatePost(): void {
  //   const payload = {
  //     title: this.editingPost.title,
  //     content: this.editingPost.content,
  //     category_ids: this.editingPost.category_ids
  //   };

  //   this.blogService.updatePost(this.editingPost.id, payload).subscribe({
  //     next: () => {
  //       alert('Post updated successfully');
  //       this.router.navigate(['/posts', this.editingPost.id]);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('Error updating post');
  //     }
  //   });
  // }

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

