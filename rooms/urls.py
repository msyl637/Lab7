from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^$', views.archive, name='archive'),
    re_path(r'^room/new/$', views.create_room, name='create_room'),
    re_path(r'^room/(?P<room_id>\d+)/$', views.get_room, name='get_room'),
    re_path(r'^register/$', views.register, name='register'),
    re_path(r'^login/$', views.login_view, name='login'),
    re_path(r'^logout/$', views.logout_view, name='logout'),
]
