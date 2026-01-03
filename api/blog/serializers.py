from rest_framework import serializers
from .models import BlogPost, Comment, Category

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at', 'post']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class BlogPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)

    category_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Category.objects.all(),
        write_only=True,
        source='categories',
        required=False
    )

    class Meta:
        model = BlogPost
        fields = [
            'id',
            'title',
            'content',
            'created_at',
            'updated_at',
            'comments',
            'categories',
            'category_ids'
        ]


