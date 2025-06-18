from rest_framework import serializers
from .models import Post, Category, Comment, Contact
from django.conf import settings

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    excerpt = serializers.CharField(source='get_excerpt', read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'content', 'image', 'created_at', 'updated_at',
            'author', 'category', 'excerpt', 'slug', 'status', 'published_at'
        ]

    def get_image(self, obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
            return f"http://localhost:8000{obj.featured_image.url}"
        return None

    def get_author(self, obj):
        return obj.author.username if obj.author else ''

    def get_category(self, obj):
        return obj.category.name if obj.category else ''

class RecentPostSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    excerpt = serializers.CharField(source='get_excerpt', read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'excerpt', 'image', 'created_at', 'author', 'category', 'slug'
        ]

    def get_image(self, obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
            return f"http://localhost:8000{obj.featured_image.url}"
        return None

    def get_author(self, obj):
        return obj.author.username if obj.author else ''

    def get_category(self, obj):
        return obj.category.name if obj.category else ''

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__' 