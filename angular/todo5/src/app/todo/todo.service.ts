import { Injectable } from '@angular/core';
import {Todo} from './todo.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private api_url = 'http://localhost:8989/api/todos';

  constructor(private http: HttpClient) { }

  getTodos (): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.api_url)
      .pipe(
        catchError(this.handleError('getTodos', []))
      );
  }

  addTodo(description: string): Observable<Todo> {
    const todo = {
      description: description,
      completed: false
    };
    return this.http.post<Todo>(this.api_url, todo, httpOptions).pipe(
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  toggleTodo(todo: Todo): Observable<any> {
    const updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
    console.log(`${updatedTodo.id}-${updatedTodo.description}-${updatedTodo.completed}`);
    return this.http.put(this.api_url, updatedTodo, httpOptions).pipe(
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.api_url}/${id}`;
    return this.http.delete<Todo>(url, httpOptions).pipe(
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
