import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

// setErrorMessage is passed in from page js so errors show on the page
export default function TaskForm({ setErrorMessage }) {
  const [newTitle, setNewTitle] = useState("");

  async function addTask(event) {
    event.preventDefault(); // stops the page from reloading

    const title = newTitle.trim(); // removes spaces at the start and end

    if (title === "") {
      setErrorMessage("Task title can't be empty.");
      return;
    }
    if (title.length > 80) {
      setErrorMessage("Task title must be 80 characters or less.");
      return;
    }
    if (!auth.currentUser) {
      setErrorMessage("You are not signed in.");
      return;
    }

    setErrorMessage("");

    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        completed: false,
        createdAt: serverTimestamp(), // firebase sets the time instead of the computer
        createdBy: auth.currentUser.uid,
      });
      setNewTitle("");
    } catch (error) {
      setErrorMessage("Could not add task: " + error.message);
    }
  }

  return (
    <form onSubmit={addTask}>
      <input
        type="text"
        placeholder="Enter a task"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />{" "}
      <button type="submit">Add Task</button>
    </form>
  );
}
