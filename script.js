const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoListContainer = document.querySelector("#todo-list");
const filterInput = document.querySelector("#todo-search");
let isEditing = false;
let editId = null;
let todos = [
  {
    id: 1,
    text: "get some eggs from the market and make an omlette",
    completed: true,
  },
  {
    id: 2,
    text: "get some milk from the market and make tea",
    completed: false,
  },
  {
    id: 3,
    text: "get some bread from the market and make an toast",
    completed: false,
  },
];

function filterTodos() {
  const textSearch = filterInput.value.trim().toLowerCase();
  let filteredTodos = [...todos];
  filteredTodos = filteredTodos.filter((todo) =>
    todo.text.toLowerCase().includes(textSearch),
  );
  renderTodos(filteredTodos);
}

function renderTodos(todoList = todos) {
  todoListContainer.innerHTML = " ";
  if (todoList.length === 0) {
    todoListContainer.innerHTML = `<p class="text-4xl font-bold text-center"> Todo list is Empty </p> `;
  }
  todoList.forEach((todo) => {
    const list = document.createElement("li");
    list.classList =
      "flex flex-wrap justify-between items-center gap-3 p-3 rounded bg-amber-200";
    list.innerHTML = `<p class="flex-1 min-w-[120px] text-center text-base sm:text-lg 4 ${todo.completed ? "line-through" : ""}">${todo.text}</p>
              <div class="flex flex-wrap justify-end gap-2">
                <button
                  id="edit-btn-${todo.id}"
                  class="px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-500 text-white rounded text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  Edit
                </button>
                <button
                  id="delete-btn-${todo.id}"
                  class="px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-700 text-white rounded text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  Delete
                </button>
                <button
                  id="toggle-btn-${todo.id}"
                  class="px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-900 text-white rounded text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  ${todo.completed ? "Completed" : "Pending"}
                </button>
              </div>`;

    todoListContainer.appendChild(list);
  });
}

function addTodos() {
  let textInput = input.value.trim().toLowerCase();
  if (textInput === "") return;
  if (isEditing) {
    todos = todos.map((todo) =>
      todo.id === editId ? { ...todo, text: textInput } : todo,
    );
    isEditing = false;
    addBtn.innerText = "Add Todo";
    input.value = "";
  } else {
    todos.push({
      id: Date.now(),
      text: textInput,
      completed: false,
    });
    textInput = "";
  }
  todos.reverse();
  renderTodos();
}

function deleteTodos(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
}

function editTodo(id) {
  let filterTodo = todos.find((todo) => todo.id === id);
  console.log(filterTodo.text);
  input.value = filterTodo.text;
  editId = filterTodo.id;
  addBtn.innerText = "Update";
  isEditing = true;
}

todoListContainer.addEventListener("click", (e) => {
  const getId = e.target.id;
  if (getId.includes("delete-btn")) {
    const formatId = getId.split("-")[2];
    const id = Number(formatId);
    deleteTodos(id);
  } else if (getId.includes("toggle-btn")) {
    const formatId = getId.split("-")[2];
    const id = Number(formatId);
    toggleTodo(id);
    renderTodos();
  } else if (getId.includes("edit-btn")) {
    const formatId = getId.split("-")[2];
    const id = Number(formatId);
    editTodo(id);
  }
});
//event listenrs
addBtn.addEventListener("click", addTodos);
filterInput.addEventListener("input", filterTodos);
renderTodos();
