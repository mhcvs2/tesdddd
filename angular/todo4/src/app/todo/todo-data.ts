import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo.model';

export class InMemoryTodoDbService implements InMemoryDbService {
  createDb() {
    let todos: Todo[] = [
      {id: 1, desc: 'Getting up', completed: true},
      {id: 2, desc: 'Go to school', completed: false}
    ];
    return {todos};
  }
}
