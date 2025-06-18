from django.test import TestCase
from .models import Post, Category, Contact
from django.contrib.auth.models import User

class CategoryModelTest(TestCase):
    def test_string_representation(self):
        category = Category(name="Test Category")
        self.assertEqual(str(category), category.name)

class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.category = Category.objects.create(name='Test Category')
        self.post = Post.objects.create(title='Test Post', author=self.user, category=self.category, content='Test content')

    def test_string_representation(self):
        self.assertEqual(str(self.post), self.post.title)

class ContactModelTest(TestCase):
    def test_string_representation(self):
        contact = Contact(name="Test User", subject="Test Subject")
        self.assertIn("Test User", str(contact)) 