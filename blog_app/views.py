from django.views import generic
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Post, Category, Contact

@method_decorator(csrf_exempt, name='dispatch')
class PostListView(generic.ListView):
    model = Post
    template_name = 'blog_app/post_list.html'
    context_object_name = 'posts'

    def get(self, request, *args, **kwargs):
        # Return JSON for API requests, template for direct access
        if request.headers.get('Accept') == 'application/json':
            posts = self.get_queryset()
            data = [{
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'image': post.featured_image.url if post.featured_image else None,
                'created_at': post.created_at.isoformat(),
                'updated_at': post.updated_at.isoformat(),
                'author': post.author.username if post.author else '',
                'category': post.category.name if post.category else '',
            } for post in posts]
            return JsonResponse(data, safe=False)
        return super().get(request, *args, **kwargs)

@method_decorator(csrf_exempt, name='dispatch')
class PostDetailView(generic.DetailView):
    model = Post
    template_name = 'blog_app/post_detail.html'
    context_object_name = 'post'

    def get(self, request, *args, **kwargs):
        if request.headers.get('Accept') == 'application/json':
            post = self.get_object()
            data = {
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'image': post.featured_image.url if post.featured_image else None,
                'created_at': post.created_at.isoformat(),
                'updated_at': post.updated_at.isoformat(),
                'author': post.author.username if post.author else '',
                'category': post.category.name if post.category else '',
            }
            return JsonResponse(data)
        return super().get(request, *args, **kwargs)

@method_decorator(csrf_exempt, name='dispatch')
class PostCreateView(generic.CreateView):
    model = Post
    fields = ['title', 'category', 'featured_image', 'excerpt', 'content', 'status']
    template_name = 'blog_app/post_form.html'

@method_decorator(csrf_exempt, name='dispatch')
class PostUpdateView(generic.UpdateView):
    model = Post
    fields = ['title', 'category', 'featured_image', 'excerpt', 'content', 'status']
    template_name = 'blog_app/post_form.html'

@method_decorator(csrf_exempt, name='dispatch')
class PostDeleteView(generic.DeleteView):
    model = Post
    template_name = 'blog_app/post_confirm_delete.html'
    success_url = '/'

@method_decorator(csrf_exempt, name='dispatch')
class CategoryListView(generic.ListView):
    model = Category
    template_name = 'blog_app/category_list.html'
    context_object_name = 'categories'

    def get(self, request, *args, **kwargs):
        if request.headers.get('Accept') == 'application/json':
            categories = self.get_queryset()
            data = [{
                'id': cat.id,
                'name': cat.name,
            } for cat in categories]
            return JsonResponse(data, safe=False)
        return super().get(request, *args, **kwargs)

@method_decorator(csrf_exempt, name='dispatch')
class CategoryDetailView(generic.DetailView):
    model = Category
    template_name = 'blog_app/category_detail.html'
    context_object_name = 'category'

@method_decorator(csrf_exempt, name='dispatch')
class ContactCreateView(generic.CreateView):
    model = Contact
    fields = ['name', 'email', 'subject', 'message']
    template_name = 'blog_app/contact_form.html'
    success_url = '/' 