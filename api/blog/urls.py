from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet
from .views import CommentViewSet
from .views import CategoryViewSet

router = DefaultRouter()
router.register(r'posts', BlogPostViewSet, basename='blogpost')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(router.urls)),
]

