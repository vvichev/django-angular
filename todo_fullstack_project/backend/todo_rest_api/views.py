from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

from todo_rest_api.models import Task
from .serializers import TaskSerializer

@csrf_exempt
def task_list(request):
  # get all tasks
  if request.method == 'GET':
    tasks = Task.objects.all()
    tasks_serializer = TaskSerializer(tasks, many=True)
    return JsonResponse(tasks_serializer.data, safe=False)
    # By default, the JsonResponse’s first parameter - data - should be a dict instance.
    # To pass any other JSON-serializable object you must set the safe=False.

  # create new task
  elif request.method == 'POST':
    task_data = JSONParser().parse(request)
    task_serializer = TaskSerializer(data=task_data)
    if task_serializer.is_valid():
      task_serializer.save()
      return JsonResponse(task_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(task_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  # delete all tasks
  elif request.method == 'DELETE':
    Task.objects.all().delete()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
def task_details(request, id):
  try:
    task = Task.objects.get(id=id)
  except Task.DoesNotExist:
    return HttpResponse(status=status.HTTP_404_NOT_FOUND)

  # get a task
  if request.method == 'GET':
    task_serializer = TaskSerializer(task)
    return JsonResponse(task_serializer.data)

  # update a task
  elif request.method == 'PUT':
    task_data = JSONParser().parse(request)
    task_serializer = taskSerializer(task, data=task_data)
    if task_serializer.is_valid():
      task_serializer.save()
      return JsonResponse(task_serializer.data)
    return JsonResponse(task_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  # delete a task
  elif request.method == 'DELETE':
    task.delete()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
def task_list_completed(request, completed):
  tasks = task.objects.filter(completed=completed)

  if request.method == 'GET':
    tasks_serializer = taskSerializer(tasks, many=True)
    return JsonResponse(customers_serializer.data, safe=False)