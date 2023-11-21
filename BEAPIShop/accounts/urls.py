# accounts/urls.py

from django.urls import path
from .views import (
    register_user,
    user_login,
    user_logout,
    update_user,
    delete_user,
    get_all_users,
)

urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", user_login, name="login"),
    path("logout/", user_logout, name="logout"),
    path("update_user/<int:user_id>/", update_user, name="update_user"),
    path("delete_user/<int:user_id>/", delete_user, name="delete_user"),
    path("getalluser/", get_all_users, name="get_all_users"),
]
