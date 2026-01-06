import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService, CategoryPost, CommentPost } from '../blog.service';
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-cateogry-selector',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './category-selector.component.html',
    styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
    @Input() postId!: number;
    categories: CategoryPost[] = [];

    constructor(
        private blogService: BlogService,
        private router: Router,) { }

    ngOnInit() {
        console.log('POST ID:', this.postId);
        this.loadCategories();
    }

    loadCategories() {
        this.blogService.getPost(this.postId).subscribe(post => {
            if (Array.isArray(post.categories)) {
                this.categories = post.categories;
            } else {
                this.categories = [];
            }
        });
    }
}