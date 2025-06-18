from rest_framework import viewsets, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post, Category, Comment, Contact
from .serializers import PostSerializer, CategorySerializer, CommentSerializer, ContactSerializer, RecentPostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-published_at', '-created_at')
    serializer_class = PostSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

# Recent posts for homepage
class RecentPostListView(generics.ListAPIView):
    queryset = Post.objects.filter(status='published').order_by('-published_at', '-created_at')[:4]
    serializer_class = RecentPostSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

# All posts for blogging page
class AllPostListView(generics.ListAPIView):
    queryset = Post.objects.filter(status='published').order_by('-published_at', '-created_at')
    serializer_class = PostSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context 