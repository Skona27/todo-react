import React, {Component} from "react";
import "./TodoList.css";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
// import all from file as TodoApi
import * as TodoApi from "./TodoApi";


class TodoList extends Component {
  constructor(props) {
    super(props);
    // our state is our todo arr
    this.state = { todos: [] };
    // we bind this in order to access this component
    this.addTodo = this.addTodo.bind(this);
  }

  // async means it will AWAIT for Promise to resolve
  async componentWillMount() {
    let todos = await TodoApi.getTodos();
    // we update state
    this.setState({todos});
  };

  async addTodo(name) {
    let newTodo = await TodoApi.createTodo(name); 
    // spread all the array elements as new array, add the new todo   
    this.setState({todos: [...this.state.todos, newTodo]});
  };

  async deleteTodo(id) {
    await TodoApi.deleteTodo(id);
    // filter array, remove if todos id's are equal
    let todos = this.state.todos.filter(todos => (todos._id !== id));
    this.setState({todos: todos});
  };

  async updateTodo(todo) {
    await TodoApi.updateTodo(todo);

    // negate the value of completed
    let todos = this.state.todos.map(t => {
      if(t._id === todo._id) {
        t.completed = !t.completed;
      }
      return t;
    });

    this.setState({todos: todos});
  };

  render() {
    // loop and create an array of jsx
    const todos = this.state.todos.map((todo) => (
      // we pass data and functions as props
      <TodoItem key={todo._id} {...todo}
       deleteTodo={this.deleteTodo.bind(this, todo._id)}
       updateTodo={this.updateTodo.bind(this, todo)} />
    ));

    return (
      <div>
        <TodoForm addTodo={this.addTodo} />
        <ul> {todos} </ul>
      </div>
    )
  }
}


export default TodoList;