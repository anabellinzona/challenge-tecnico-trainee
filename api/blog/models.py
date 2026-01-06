from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "categories"
        ordering = ['name']

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    categories = models.ManyToManyField(
        Category,
        related_name='posts',
        blank=True
    )
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(
        BlogPost,
        related_name='comments',
        on_delete=models.CASCADE
    )
    # author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Comment: {self.content[:50]}"
    
    class User(models.Model):
        username = models.CharField(max_length=50, unique=True)

        def __str__(self):
            return self.username

