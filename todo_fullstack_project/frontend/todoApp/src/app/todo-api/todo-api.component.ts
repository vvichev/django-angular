import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { TodosApiService } from '../todos-api.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-api',
  templateUrl: './todo-api.component.html',
  styleUrls: ['./todo-api.component.css']
})
export class TodoApiComponent implements OnInit {
  todos: Observable<Todo[]>;

  constructor(private todosApiService: TodosApiService) { }

  ngOnInit() {
    this.reloadData();
  }

  // to submit item with enter, not only  with add btn click
  todoSubmit(form:any){
    let value = form.value;
    if(value!==""){
      this.createTodo(value)
      form.resetForm();
    }else{
      alert('Field required **')
    }
  }

  deleteAllTodos() {
    this.todosApiService.deleteAllTodos()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }

  deleteTodo(todo) {
    this.todosApiService.deleteTodo(todo.id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }

  createTodo(title) {
    console.warn('Will be implemented in labs')
  }

  updateTodo(todo){
    console.warn('Will be implemented in labs');

  }

  // list todos
  reloadData() {
    this.todos = this.todosApiService.getAllTodos();
  }
}