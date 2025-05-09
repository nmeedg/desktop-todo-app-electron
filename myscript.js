var allTodos = [];
var contentElement = document.getElementById("content");
var createButton = document.getElementById("createButton");
var exportButton = document.getElementById("exportButton");


const myModal = new bootstrap.Modal("#mymodal", {
  keyboard: false,
});

const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = (todo) => {
  const todos = getTodos();
  todos.push(todo);
  saveTodos(todos);
};

function removeTodo(index) {
  const todos = getTodos();
  todos.splice(index, 1);
  saveTodos(todos);
  renderTodos();
}

function updateTodo(index, todo) {
  const todos = getTodos();
  todos[index] = todo;
  saveTodos(todos);
}

function addTodoButton() {
  var inputElement = document.getElementById("input");
  var checkboxElement = document.getElementById("checkbox");
  var todoToAdd = {
    title: inputElement.value,
    complete: checkboxElement.checked,
  };
  addTodo(todoToAdd);
  myModal.hide();
  console.log(localStorage.getItem("todos"));
}

createButton.addEventListener("click", function () {
  addTodoButton();
  renderTodos();
});

exportButton.addEventListener("click", function () {
  exportTodos();
}
);
function exportTodos() {
    const todos = getTodos();
    const blob = new Blob([JSON.stringify(todos)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "all_todos.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function renderTodos() {
  if (getTodos().length == 0) {
    contentElement.textContent = "Aucune todo à afficher";
    contentElement.classList.add("text-center", "mt-5", "fs-4","fw-bold");
  } else {
    contentElement.innerHTML = "";
    allTodos = getTodos();
    contentElement.classList.remove("text-center", "mt-5", "fs-4","fw-bold");

    const taskList = document.createElement("ul");
    taskList.classList.add("list-group");
    allTodos.forEach((task, index) => {
      const mydiv = document.createElement("div");
      const mydiv2 = document.createElement("div");
      const myinput2 = document.createElement("input");
      mydiv2.classList.add("form-check", "form-switch", "me-2");
      myinput2.type = "checkbox";
      myinput2.classList.add("form-check-input");
      mydiv2.appendChild(myinput2);
      myinput2.checked = task.complete;
      mydiv.classList.add("list-group-item");
      mydiv.classList.add("d-flex", "justify-content-between");
      mydiv.classList.add("align-items-center");
      var myspan = document.createElement("span");
      var icon = document.createElement("i");
      icon.classList.add("bx", "bxs-trash", "fs-5", "me-2", "text-danger");
      icon.style.cursor = "pointer";
      icon.onclick = () => removeTodo(index);
      myspan.textContent = task.title;
      myspan.classList.add("text-capitalize")
      mydiv.appendChild(myspan);
      mydiv2.appendChild(icon);
      mydiv.appendChild(mydiv2);
      myinput2.addEventListener("change", function () {
        task.complete = myinput2.checked;
        updateTodo(index, task);
        if (task.complete) {
          myspan.classList.add("text-decoration-line-through");
        }
        if (!task.complete) {
          myspan.classList.remove("text-decoration-line-through");
        }
      });
        if (task.complete) {
            myspan.classList.add("text-decoration-line-through");
        } else {
            myspan.classList.remove("text-decoration-line-through");
        }
      taskList.appendChild(mydiv);
    });

    console.log(taskList);

    contentElement.appendChild(taskList);
  }
}

renderTodos();
