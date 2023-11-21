from django.urls import path
from .views import (
    create_shoes_type,
    update_shoes_type,
    delete_shoes_type,
    get_all_shoes_types,
)

urlpatterns = [
    path("createtype/", create_shoes_type, name="create_shoes_type"),
    path("updatetype/", update_shoes_type, name="update_shoes_type"),
    path("deletetype/", delete_shoes_type, name="delete_shoes_type"),
    path("getalltype/", get_all_shoes_types, name="get_all_shoes_types"),
    # Các đường dẫn khác nếu có
]
