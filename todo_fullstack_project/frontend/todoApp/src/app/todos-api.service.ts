import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodosApiService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // API: GET http://127.0.0.1:8000/api/tasks/
  public getAllTodos(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/tasks/').pipe(
        map(response => {
          const todos = response;
          return todos;
        }),
        catchError(this.handleError),
      )
  }

  // API: POST http://127.0.0.1:8000/api/tasks/
   createTodo(todo: Todo): Observable<any> {
    console.dir(todo);

    return this.http
    .post(`${this.baseUrl}/tasks/`, todo)
    .pipe(map(response => {
      console.dir(response);
      return response;
    }))
  }

  deleteAllTodos(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/`);
  }


  // API: DELETE http://127.0.0.1:8000/api/task/<id>
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/task/${id}/`);
  }


  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
  // </any></id></any></any></any>