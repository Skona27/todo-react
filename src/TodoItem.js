import React from "react";
import "./TodoItem.css";

// stateless component, just function
// we pass props into it
// function can be a prop
const TodoItem = ({name, completed, deleteTodo, updateTodo}) => (
    <li> 
        <span className={completed ? "completed" : ""} onClick={updateTodo}>
            {name} 
        </span>

        <span onClick={deleteTodo}> X </span>
    </li>
)

export default TodoItem;
