import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService, CategoryPost, CommentPost } from '../../blog.service';
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-cateogry-selector',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './category-detail.component.html',
    styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

    @Input() postId!: number;
    categories: CategoryPost[] = [];
    searchTerm: string = '';
    editingCategorytId: number | null = null;
    editingCategory: Partial<CategoryPost> = {};
    expandedPostIds: Set<number> = new Set();
    visibleCategoryPostId: number | null = null;
    expandedPostId: Set<number> = new Set();
    category: Partial<CategoryPost> = { name: '' };
    newCategory: boolean = false;

    constructor(
        private blogService: BlogService,
        private router: Router,) { }

    ngOnInit() {
        console.log('POST ID:', this.postId);
        this.loadCategories();
    }

    loadCategories() {
        this.blogService.getCategories().subscribe(cat => {
            if (Array.isArray(cat)) {
                this.categories = cat;
            } else {
                this.categories = [];
            }
        });
    }


    startEdit(comment: CategoryPost): void {
        this.editingCategorytId = comment.id;
        this.editingCategory = { ...comment };
    }

    cancelEdit(): void {
        this.editingCategorytId = null;
        this.editingCategory = {};
        this.newCategory = false;
    }

    editCategory(): void {
        if (this.editingCategorytId && this.editingCategory.id) {
            this.blogService.updateCategory(this.editingCategorytId, this.editingCategory).subscribe({
                next: () => {
                    alert('Comment updated successfully');
                    this.cancelEdit();
                    this.loadCategories();
                },
                error: (error) => {
                    console.error('Error updating comment:', error);
                    alert('Error updating comment. Please try again.');
                }
            });
        }
    }

    deleteCategory(id: number): void {
        if (confirm('Are you sure you want to delete this comment?')) {
            this.blogService.deleteCategory(id).subscribe({
                next: () => {
                    alert('Post deleted successfully');
                    this.loadCategories();
                },
                error: (error) => {
                    console.error('Error deleting comment:', error);
                    alert('Error deleting comment. Please try again.');
                }
            });
        }
    }

    startAdd(): void {
        this.newCategory = true;
        this.category = {
            name: ''
        };
    }

    saveCategory(): void {
        console.log(this.category);
        this.blogService.createCategory(this.category).subscribe({
            next: (newCategory) => {
                alert('Category created successfully');
                this.router.navigate(['/posts']);
            },
            error: (error) => {
                console.error('Error creating cateogry:', error);
                alert('Error creating category. Please try again.');
            }
        });
    }
}