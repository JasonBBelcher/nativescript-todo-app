import { Injectable } from '@angular/core';

import { ITodo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
    private todos: Array<ITodo> = [];

  createTodo(todotext) {
    this.todos.push({
      id: Math.random() * 10,
      text: todotext,
      priority: 0
    });
  }

  getTodos() {
    return Promise.resolve(this.todos);
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return Promise.resolve(this.todos);
  }

  clearTodos() {
    return Promise.resolve((this.todos = []));
  }
}
