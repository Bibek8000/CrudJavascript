import { addItem, updateItemName } from "./app.js";

// Create Form Element
export function createForm(editId = null, editItem = null) {
  const form = document.createElement("form");

  // Form inner HTML
  form.innerHTML = `
    <h2>grocery bud</h2>
    <div class="form-control">
      <input 
        type="text" 
        class="form-input" 
        placeholder="e.g. eggs" 
        value="${editItem ? editItem.name : ""}" 
      />
      <button type="submit" class="btn">
        ${editId ? "edit item" : "add item"}
      </button>
    </div>
  `;

  const input = form.querySelector(".form-input");

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    if (editId) {
      // Update existing item
      updateItemName(value);
    } else {
      // Add new item
      addItem(value);
    }

    input.value = "";
  });

  return form;
}
