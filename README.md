# Blogging Website

A full-featured blogging platform built with Django and modern frontend technologies.

## Features

- User registration and authentication
- Blog post creation, editing, and deletion (admin)
- Blog post viewing and rating (users)
- Contact form
- Responsive design
- Admin dashboard
- User profiles

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

7. Visit http://127.0.0.1:8000/ to view the website

## Project Structure

- `blog/` - Main Django project directory
- `blog_app/` - Main application directory
- `static/` - Static files (CSS, JavaScript, images)
- `templates/` - HTML templates
- `media/` - User-uploaded files

## Technologies Used

- Backend: Django 5.0.2
- Frontend: HTML5, CSS3, JavaScript
- Database: SQLite (development)
- Additional: Bootstrap 5, CKEditor, Django Crispy Forms 