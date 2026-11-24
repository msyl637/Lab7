from django.shortcuts import render, redirect
from django.http import Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import Room

def archive(request):
    posts = Room.objects.all().order_by('-created_date')
    return render(request, 'archive.html', {"posts": posts})


def get_room(request, room_id):
    try:
        post = Room.objects.get(id=room_id)
        return render(request, 'room.html', {"post": post})
    except Room.DoesNotExist:
        raise Http404


def create_room(request):
    """GET — показать форму. POST — сохранить новый номер."""
    if request.user.is_anonymous:
        raise Http404

    if request.method == "POST":
        form = {
            'title': request.POST.get("title", "").strip(),
            'text': request.POST.get("text", "").strip(),
        }

        if not form["title"] or not form["text"]:
            form['errors'] = "Не все поля заполнены"
            return render(request, 'create_room.html', {'form': form})

        if Room.objects.filter(title=form["title"]).exists():
            form['errors'] = "Номер с таким названием уже существует"
            return render(request, 'create_room.html', {'form': form})

        room = Room.objects.create(
            title=form["title"],
            text=form["text"],
            author=request.user,
        )
        return redirect('get_room', room_id=room.id)

    return render(request, 'create_room.html', {})
def register(request):
    """Регистрация нового пользователя."""
    if request.method == "POST":
        form = {
            'username': request.POST.get("username", "").strip(),
            'email': request.POST.get("email", "").strip(),
            'password': request.POST.get("password", ""),
            'password2': request.POST.get("password2", ""),
        }

        if not form['username'] or not form['password'] or not form['password2']:
            form['errors'] = "Заполните логин и пароль"
            return render(request, 'register.html', {'form': form})

        if form['password'] != form['password2']:
            form['errors'] = "Пароли не совпадают"
            return render(request, 'register.html', {'form': form})

        if User.objects.filter(username=form['username']).exists():
            form['errors'] = "Пользователь с таким именем уже есть"
            return render(request, 'register.html', {'form': form})

        User.objects.create_user(
            username=form['username'],
            email=form['email'],
            password=form['password'],
        )
        return redirect('login')

    return render(request, 'register.html', {})
def login_view(request):
    """Вход в систему."""
    if request.method == "POST":
        form = {
            'username': request.POST.get("username", "").strip(),
            'password': request.POST.get("password", ""),
        }

        if not form['username'] or not form['password']:
            form['errors'] = "Заполните логин и пароль"
            return render(request, 'login.html', {'form': form})

        user = authenticate(username=form['username'], password=form['password'])
        if user is None:
            form['errors'] = "Неверный логин или пароль"
            return render(request, 'login.html', {'form': form})

        login(request, user)
        return redirect('archive')

    return render(request, 'login.html', {})

def logout_view(request):
    logout(request)
    return redirect('archive')
