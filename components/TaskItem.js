import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function TaskItem({ task, setErrorMessage }) {
  // only sends completed because the rules block changing anything else
  async function toggleTask() {
    try {
      await updateDoc(doc(db, "tasks", task.id), { completed: !task.completed });
    } catch (error) {
      setErrorMessage("Could not update task: " + error.message);
    }
  }

  return (
    <li style={{ marginBottom: 8 }}>
      <label>
        <input type="checkbox" checked={task.completed} onChange={toggleTask} />{" "}
        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          {task.title}
        </span>
      </label>
    </li>
  );
}
