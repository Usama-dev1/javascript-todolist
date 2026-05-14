const input = document.querySelector("#todo-input");
const todoListContainer = document.querySelector("#todo-list");
const todoSearch = document.querySelector("#todo-search");
const addBtn = document.querySelector("#add-btn");

let todos = [
  { id: 1, text: "get milk", completed: true },
  { id: 2, text: "get eggs", completed: false },
  { id: 3, text: "get bread", completed: false },
];

let isEditing = false;
let updateId = null;

function renderTodos() {
  const searchText = todoSearch ? todoSearch.value.trim().toLowerCase() : "";
  let filteredTodos = [...todos];
  if (searchText !== "") {
    filteredTodos = filteredTodos.filter((todo) =>
      todo.text.toLowerCase().includes(searchText),
    );
  }

  todoListContainer.innerHTML = "";
  if (filteredTodos.length === 0) {
    todoListContainer.innerHTML = `<li class="text-center text-gray-500 p-4">No todos found</li>`;
    return;
  }
  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className =
      "flex flex-wrap justify-between items-center gap-3 p-3 rounded bg-amber-200";

    li.innerHTML = `
      <p class="flex-1 min-w-[120px] text-base sm:text-lg ${todo.completed ? "line-through" : ""}">${todo.text}</p>
      <div class="flex flex-wrap justify-end gap-2">
        <button data-id="${todo.id}" class="edit-btn px-3 py-1.5 sm:px-4 sm:py-2 bg-black text-white rounded text-xs sm:text-sm md:text-base whitespace-nowrap">Edit</button>
        <button data-id="${todo.id}" class="delete-btn px-3 py-1.5 sm:px-4 sm:py-2 bg-black text-white rounded text-xs sm:text-sm md:text-base whitespace-nowrap">Delete</button>
        <button data-id="${todo.id}" class="toggle-btn px-3 py-1.5 sm:px-4 sm:py-2 bg-black text-white rounded text-xs sm:text-sm md:text-base whitespace-nowrap">${todo.completed ? "Undo" : "Completed"}</button>
      </div>
    `;
    todoListContainer.appendChild(li);
  });
}

function addOrEditTodos() {
  let todoText = input.value.trim();
  if (todoText === "") return;

  if (isEditing) {
    todos = todos.map((todo) =>
      todo.id === updateId ? { ...todo, text: todoText } : todo,
    );
    isEditing = false;
    updateId = null;
    addBtn.innerText = "Add Todo";
  } else {
    todos.push({
      id: Date.now(),
      text: todoText,
      completed: false,
    });
  }
  input.value = "";
  renderTodos();
}

function deleteTodos(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos(); // immediate re-render
}

addBtn.addEventListener("click", addOrEditTodos);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addOrEditTodos();
});

if (todoSearch) {
  todoSearch.addEventListener("input", () => renderTodos());
}

todoListContainer.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("delete-btn")) {
    const id = parseInt(target.dataset.id, 10);
    deleteTodos(id);
    return;
  }

  if (target.classList.contains("toggle-btn")) {
    const id = parseInt(target.dataset.id, 10);
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    renderTodos();
    return;
  }

  if (target.classList.contains("edit-btn")) {
    const id = parseInt(target.dataset.id, 10);
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      input.value = todoToEdit.text;
      isEditing = true;
      updateId = id;
      addBtn.innerText = "Update";
    }
    return;
  }
});

renderTodos();
