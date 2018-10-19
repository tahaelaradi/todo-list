const server = io("http://localhost:3003/");
const list = document.getElementById("todo-list");

// NOTE: These are all our globally scoped functions for interacting with the server
// This function adds a new todo from the input
function add() {
  console.warn(event);
  const input = document.getElementById("todo-input");

  // Prevent whitespace input as a todo item
  if (input.value) {
    // Emit the new todo as some data to the server
    server.emit("make", {
      title: input.value
    });

    // Clear the input
    input.value = "";
  }

  // Refocus the element
  input.focus();
}

function render(todo) {
  console.log(todo);
  const listItem = document.createElement("li");
  const listItemText = document.createTextNode(todo.title);
  listItem.appendChild(listItemText);
  list.append(listItem);
}

// NOTE: These are listeners for events from the server
// This event is for (re)loading the entire list of todos from the server
server.on("load", todos => {
  // Ensures reset of todo list on client connections already viewing the app
  // instead of appending the rendred todos to existing todos on the app page
  list.innerHTML = "";
  todos.forEach(todo => render(todo));
});

// This event is for loading the lastest todo item to todos list
server.on("newTodo", todo => {
  render(todo);
});
