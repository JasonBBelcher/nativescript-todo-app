import { Component, OnInit } from "@angular/core";
import { ITodo } from "./todos/todo";
import { TodoService } from "./todos/todo.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    constructor(private repository: TodoService) {}

    todos: Array<ITodo>

    ngOnInit() {
        this.repository.getTodos().then(todos => {
            this.todos = todos;
        })
    }

    addTodo(input) {

        if (input.text) {
          this.repository.createTodo(input.text);
          this.getTodos();
          input.text = "";
        } else {
            return;
        }
      }


      getTodos() {
        this.repository.getTodos().then(todos => {
          this.todos = todos;
        });
      }

      removeTodo(id) {
        this.repository.removeTodo(id).then(todos => {
          this.todos = todos;
        });
      }

      clearTodos() {
          this.repository.clearTodos().then(todos => {
              this.todos = todos;
          })
      }



      changePriority(operation, todo) {
          console.log(todo.priority)
        if (operation === "+") {
          todo.priority += 1;
        }
        if (operation === "-") {
          if (todo.priority > 0) {
            todo.priority -= 1;
          }
        }
      }

      filterSearch(value) {
          let isNumber = !isNaN(parseInt(value.text));

        if(value.text) {
            if (!isNumber) {

              this.todos = this.todos.filter(todo => {
                return todo.text.toLowerCase().indexOf(value.text.toLowerCase()) > -1;
              });
            } else if (isNumber) {
                this.todos = this.todos.filter(todo => {
                    return todo.priority == value.text;
                  });
            }

        } else {
            this.getTodos();
        }
      }


 }
