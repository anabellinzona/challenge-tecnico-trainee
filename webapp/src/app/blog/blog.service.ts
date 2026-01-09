import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CommentPost {
  id: number;
  content: string;
  created_at: string;
  post: number;
}


export interface CategoryPost{
  id: number;
  name: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  comments: CommentPost[];
  categories: CategoryPost[];
  category_ids: number[];
}

@Injectable({
  providedIn: 'root'
})

export class BlogService {


private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //CRUD POST
  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/posts/`);
  }

  getPost(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/posts/${id}/`);
  }

  createPost(post: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/posts/`, post);
  }

  updatePost(id: number, post: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/posts/${id}/`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}/`);
  }

  //CRUD COMMENT
  getComments(): Observable<CommentPost[]>{
    return this.http.get<CommentPost[]>(`${this.apiUrl}/comments/`)
  }

  getComment(id: number): Observable<CommentPost[]> {
    return this.http.get<CommentPost[]>(`${this.apiUrl}/comments/?post=${id}`);
  }

  createComment(comment: Partial<CommentPost>): Observable<CommentPost> {
    return this.http.post<CommentPost>(`${this.apiUrl}/comments/`, comment);
  }

  updateComment(id: number, post: Partial<CommentPost>): Observable<CommentPost> {
    return this.http.put<CommentPost>(`${this.apiUrl}/comments/${id}/`, post);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${id}/`);
  }

  //CRUD CATEGORY
  getCategories(): Observable<CategoryPost[]>{
    return this.http.get<CategoryPost[]>(`${this.apiUrl}/categories/`)
  }

  getCategory(id: number): Observable<CategoryPost> {
    return this.http.get<CategoryPost>(`${this.apiUrl}/categories/${id}/`);
  }

  createCategory(category: Partial<CategoryPost>): Observable<CategoryPost> {
    return this.http.post<CategoryPost>(`${this.apiUrl}/categories/`, category);
  }

  updateCategory(id: number, post: Partial<CategoryPost>): Observable<CategoryPost> {
    return this.http.put<CategoryPost>(`${this.apiUrl}/categories/${id}/`, post);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}/`);
  }

  //FILTER
  getPostsFiltered(categoryId?: number, search?: string): Observable<BlogPost[]> {
    let params: any = {};

    if (categoryId) {
      params.category = categoryId;
    }

    if (search) {
      params.search = search;
    }

    return this.http.get<BlogPost[]>(`${this.apiUrl}/posts/`, { params });
  }
}

