import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost, CategoryPost } from '../blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  post: Partial<BlogPost> = {
    title: '',
    content: '',
    category_ids: []
  };

  categories: CategoryPost[] = [];

  constructor(
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.blogService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error(err)
    });
  }

  onCategoryChange(event: Event, categoryId: number): void {
    const checkbox = event.target as HTMLInputElement;

    if (!this.post.category_ids) {
      this.post.category_ids = [];
    }

    if (checkbox.checked) {
      this.post.category_ids.push(categoryId);
    } else {
      this.post.category_ids = this.post.category_ids.filter(
        id => id !== categoryId
      );
    }
  }

  savePost(): void {
    console.log(this.post); 

    this.blogService.createPost(this.post).subscribe({
      next: () => {
        alert('Post created successfully');
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        console.error('Error creating post:', error);
        alert('Error creating post');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/posts']);
  }
}
