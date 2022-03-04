from django.shortcuts import render
from .models import Blog
# Create your views here.


def blogs(request):
    blogs = Blog.objects
    return render(request, 'blogs/allblogs.html', {'blogs': blogs})
