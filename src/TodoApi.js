// our api route
const URL = "/api/todos";


// async means it will wait for request to be completed
export async function getTodos() {
  return fetch(URL)
    .then(handleErrors)
    .then(response => response.json())
}

// we need stringify json, we cannot pass string or object
export async function createTodo(name) {
  return fetch(URL, {
    method: "post",
    headers: new Headers({
        'Content-Type': 'application/json'
      }),
    body: JSON.stringify({name: name})
  })
  .then(handleErrors)
  .then(response => response.json());
}

export async function deleteTodo(id) {
  return  fetch(`${URL}/${id}`, {
    method: "delete",
  })
  .then(handleErrors)
  .then(response => response.json());
}

export async function updateTodo(todo) {
  return fetch(`${URL}/${todo._id}`, {
    method: "put",
    headers: new Headers({
        'Content-Type': 'application/json'
      }),
    body: JSON.stringify({completed: !todo.completed})
  })
  .then(handleErrors)
  .then(response => response.json());
}

// error handling
// throw error if response not ok
function handleErrors(response) {
  if (!response.ok) {
    let err;
    if (response.status >= 400 && response.status < 500) {
      return response.json().then(data => {
        err = { errorMessage: data.message };
      })
    } else {
      err = { errorMessage: "Sorry, error occured." };
    }
    throw err;
  }
  // return response promise so we can chain '.then' later
  return response;
}