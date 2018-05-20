import React, {Component} from "react";
import "./TodoForm.css";

class TodoForm extends Component {
   constructor(props) {
      super(props);

      // our state is value of input
      this.state = {inputValue : ""};

      // important binding, to pass the value of this
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   // we change state on input change
   handleChange(e) {
      this.setState({ inputValue: e.target.value });
   }

   handleSubmit(e) {
     // prevent default - prevent form from refreshing the page
      e.preventDefault();
      // invoke function passed as prop
      this.props.addTodo(this.state.inputValue);
      // clear the input
      this.setState({ inputValue: "" });
   }

   render() {
      return (
        // listen on form submit
         <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
            <button type="submit">Add</button>
         </form>
      )
   }
}

export default TodoForm;