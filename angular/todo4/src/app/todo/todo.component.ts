import { Component, OnInit } from '@angular/core';
import {Todo} from "./todo.model";
import {TodoService} from "./todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  desc = '';

  constructor(
    private service: TodoService
  ) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos():void {
    this.service.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  addTodo(){
    this.desc = this.desc.trim();
    if (!this.desc) {return;}
    this.service.addTodo(this.desc)
      .subscribe(
        todo => {
          this.todos.push(todo);
          console.log(todo.id);
          this.desc = '';
        }
      );
  }

  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service.toggleTodo(todo).subscribe(
      t => {
        console.log("toggle success");
        this.getTodos();
        // this.todos = [...this.todos.slice(0, i), t, ...this.todos.slice(i+1)];
      }
    );
  }

  removeTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.service.deleteTodo(todo).subscribe();
  }

}
