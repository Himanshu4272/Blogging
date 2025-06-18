from rest_framework import routers
from django.urls import path, include
from . import api_views

router = routers.DefaultRouter()
router.register(r'posts', api_views.PostViewSet)
router.register(r'categories', api_views.CategoryViewSet)
router.register(r'comments', api_views.CommentViewSet)
router.register(r'contacts', api_views.ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('recent-posts/', api_views.RecentPostListView.as_view(), name='recent-posts'),
    path('all-posts/', api_views.AllPostListView.as_view(), name='all-posts'),
] 