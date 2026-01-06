import { Routes } from '@angular/router';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { CategorySelectorComponent } from './blog/category-selector/category-selector.component';

export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: BlogListComponent },
  { path: 'posts/new', component: BlogDetailComponent },
  { path: 'category/new', component: CategorySelectorComponent }
];

