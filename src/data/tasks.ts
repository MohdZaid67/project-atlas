import type { Task } from "../types/task";

export const tasks: Task[] = [
  { id: 1, title: "Learn TypeScript", completed: false },
  { id: 2, title: "Build Project Atlas", completed: true },
];

export function renderTasks() {
  const list = document.getElementById("task-list")!;
  list.innerHTML = tasks
    .map(t => `
      <li>
        <input type="checkbox" data-id="${t.id}" class="toggle-btn" ${t.completed ? "checked" : ""} />
        <span>${t.title}</span>
        <button data-id="${t.id}" class="delete-btn">✕</button>
      </li>
    `)
    .join("");

  // checkboxes ke liye listener
  list.querySelectorAll<HTMLInputElement>(".toggle-btn").forEach(box => {
    box.addEventListener("change", () => {
      const id = Number(box.dataset.id);
      toggleTask(id);
    });
  });

  // delete buttons ke liye listener
  list.querySelectorAll<HTMLButtonElement>(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      deleteTask(id);
    });
  });
}

export function addTask(title: string) {
  const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  tasks.push({ id: newId, title, completed: false });
  renderTasks();
}

export function toggleTask(id: number) {
  const t = tasks.find(t => t.id === id);
  if (t) t.completed = !t.completed;
  renderTasks();
}

export function deleteTask(id: number) {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) tasks.splice(index, 1);
  renderTasks();
}

renderTasks();