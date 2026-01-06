from rest_framework import viewsets
from .models import BlogPost
from .models import Comment
from .models import Category

from .serializers import BlogPostSerializer
from .serializers import CommentSerializer
from .serializers import CategorySerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        queryset = BlogPost.objects.all()

        category_id = self.request.query_params.get('category')
        search = self.request.query_params.get('search')

        if category_id:
            queryset = queryset.filter(categories__id=category_id)

        if search:
            queryset = queryset.filter(
                title__icontains=search
            ) | queryset.filter(
                content__icontains=search
            )

        return queryset.distinct()
    
class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    # permission_classes = [IsOwner]
    def get_queryset(self):
        queryset = Comment.objects.all()
        post_id = self.request.query_params.get('post')
        if post_id:
            queryset = queryset.filter(post_id = post_id)
        return queryset
    
class CategoryViewSet(viewsets.ModelViewSet):
    queryset= Category.objects.all()
    serializer_class = CategorySerializer
        

