from django.urls import path, re_path
from . import views

urlpatterns = [
  path('tasks/', views.task_list),
  path('task/<int:id>/', views.task_details),
]