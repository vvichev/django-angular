from django.db import models
from django.utils import timezone
from datetime import datetime


def days_from_now_1():
  return timezone.now() + timezone.timedelta(days=1)

# Create your models here.
class Task(models.Model):
  id = models.AutoField(primary_key=True)
  title = models.CharField('Title', max_length=100, help_text="Task Title")
  description = models.TextField('Description', null=True, help_text="Task Description")

  image = models.ImageField(
    'Image',
    null=False, blank=True,
    help_text='Task image',
    upload_to='images/')

  due = models.DateTimeField(
    'due',
    default=days_from_now_1,
    help_text="Task Due (default - 1 day from now)")

  created = models.DateTimeField(auto_now_add=True)
  completed = models.BooleanField(default=False)

  def __str__(self):
    return f"{self.title} - {self.description}"
