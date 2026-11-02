import React, { useState } from "react";
import "../style.css";
export default function TaskManager() {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    priority: "medium",
    urgent: false,
  });

  const [filter, setFilter] = useState("all");

  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState("");

  // 1. تغيير بيانات الفورم
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  // 2. إضافة مهمة جديدة
  const addTask = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    const newTask = {
      id: Date.now(),
      ...form,
      done: false,
    };

    setTasks([...tasks, newTask]);

    setForm({
      title: "",
      priority: "medium",
      urgent: false,
    });
  };

  // 3. حذف مهمة
  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // 4. إنهاء المهمة أو إرجاعها
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // 5. بدء تعديل المهمة
  const startEdit = (task) => {
    setEditId(task.id);
    setDraft(task.title);
  };

  // 6. حفظ التعديل
  const saveEdit = () => {
    if (!draft.trim()) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === editId ? { ...t, title: draft } : t
      )
    );

    setEditId(null);
    setDraft("");
  };

  // 7. إلغاء التعديل
  const cancelEdit = () => {
    setEditId(null);
    setDraft("");
  };

  // 8. الفلترة
  const visible = tasks.filter((t) =>
    filter === "all"
      ? true
      : filter === "done"
      ? t.done
      : !t.done
  );

  // 9. حساب عدد المهام المكتملة
  const doneCount = tasks.filter((t) => t.done).length;

  // 10. إضافة 3 مهام تجريبية (Bonus)
  const addThree = () => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "Study React",
        priority: "high",
        urgent: true,
        done: false,
      },
      {
        id: Date.now() + 1,
        title: "Practice JavaScript",
        priority: "medium",
        urgent: false,
        done: false,
      },
      {
        id: Date.now() + 2,
        title: "Review the lesson",
        priority: "low",
        urgent: false,
        done: false,
      },
    ]);
  };

  return (
    <div>
      <h1>Mini Task Manager</h1>

      {/* فورم الإضافة */}
      <form onSubmit={addTask}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={form.urgent}
            onChange={(e) =>
              setForm({ ...form, urgent: e.target.checked })
            }
          />
          Urgent
        </label>

        <button type="submit">Add Task</button>
      </form>

      <hr />

      {/* Bonus */}
      <button type="button" onClick={addThree}>
        Add 3 Demo Tasks
      </button>

      {/* عداد المهام */}
      <h3>
        Completed {doneCount} of {tasks.length} tasks
      </h3>

      <hr />

      {/* الفلترة */}
      <h3>Filter Tasks</h3>

      <label>
        <input
          type="radio"
          name="filter"
          value="all"
          checked={filter === "all"}
          onChange={() => setFilter("all")}
        />
        All
      </label>

      <label>
        <input
          type="radio"
          name="filter"
          value="done"
          checked={filter === "done"}
          onChange={() => setFilter("done")}
        />
        Completed
      </label>

      <label>
        <input
          type="radio"
          name="filter"
          value="pending"
          checked={filter === "pending"}
          onChange={() => setFilter("pending")}
        />
        Remaining
      </label>

      <hr />

      {/* عرض المهام */}
      <h2>Tasks List</h2>

      {visible.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        <ul>
          {visible.map((t) => (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(t.id)}
              />

              {editId === t.id ? (
                <>
                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />

                  <button type="button" onClick={saveEdit}>
                    Save
                  </button>

                  <button type="button" onClick={cancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: t.done ? "line-through" : "none",
                    }}
                  >
                    {t.title}
                  </span>

                  {" - "}
                  Priority: {t.priority}

                  {t.urgent && " - Urgent"}

                  <button
                    type="button"
                    onClick={() => startEdit(t)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => removeTask(t.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}