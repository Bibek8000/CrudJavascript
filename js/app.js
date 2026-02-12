import { createItems } from "./items.js";
import { createForm } from "./form.js";

// ---------------- STATE ----------------
let items = getLocalStorage();
let editId = null;

// ---------------- RENDER ----------------
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null,
  );

  const itemsElement = createItems(items);

  app.appendChild(formElement);
  app.appendChild(itemsElement);
}

// ---------------- INITIALIZE ----------------
render();

// ---------------- ID GENERATOR ----------------
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// ---------------- LOCAL STORAGE ----------------
function getLocalStorage() {
  const list = localStorage.getItem("grocery-list");
  return list ? JSON.parse(list) : [];
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

// ---------------- FUNCTIONS ----------------

// Add Item
export function addItem(itemName) {
  const newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
  };

  items = [...items, newItem];
  setLocalStorage(items);
  render();
}

// Toggle Completed
export function editCompleted(itemId) {
  items = items.map((item) =>
    item.id === itemId ? { ...item, completed: !item.completed } : item,
  );

  setLocalStorage(items);
  render();
}

// Remove Item
export function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);

  setLocalStorage(items);
  render();
}

// Set Edit Mode
export function setEditId(itemId) {
  editId = itemId;
  render();

  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) input.focus();
  }, 0);
}

// Update Item Name
export function updateItemName(newName) {
  items = items.map((item) =>
    item.id === editId ? { ...item, name: newName } : item,
  );

  editId = null;
  setLocalStorage(items);
  render();
}
