from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib import auth


def homepage(request):
    return render(request, 'home.html')


# Sign Up
def signup(request):

    if request.method == 'POST':

        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.get(username=request.POST['username'])
                return render(request, 'signup.html', {'error': 'User already exists!'})
            except User.DoesNotExist:
                user = User.objects.create_user(
                    request.POST['username'], password=request.POST['password1'])
                auth.login(request, user)
                return redirect('home')
        else:
            return render(request, 'signup.html', {'error': 'Passwords don\'t match!'})

    else:
        return render(request, 'signup.html')


# Sign In

def signin(request):
    if request.method == 'POST':
        user = auth.authenticate(
            username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            auth.login(request, user)
            return redirect('home')
        else:
            return render(request, 'signin.html', {'error': 'Incorrect username or password'})

    return render(request, 'signin.html')


def logout(request):
    if request.method == 'POST':
        auth.logout(request)
        return redirect('home')
