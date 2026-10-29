"use client"; // lets this page use state and run in the browser

import { useEffect, useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // runs once when the page first loads
  useEffect(() => {
    let stopListening = null;

    // signs in without an email or password but still gives a user id
    signInAnonymously(auth)
      .then(() => {
        const tasksQuery = query(collection(db, "tasks"), orderBy("createdAt", "desc"));

        // live updates so tasks from other apps show up right away
        stopListening = onSnapshot(
          tasksQuery,
          (snapshot) => {
            const list = [];
            snapshot.forEach((taskDoc) => {
              const data = taskDoc.data();
              list.push({ id: taskDoc.id, title: data.title, completed: data.completed });
            });
            setTasks(list);
            setLoading(false);
          },
          (error) => {
            setErrorMessage("Could not load tasks: " + error.message);
            setLoading(false);
          }
        );
      })
      .catch((error) => {
        setErrorMessage("Could not sign in: " + error.message);
        setLoading(false);
      });

    // stops the listener when you leave the page
    return () => {
      if (stopListening) stopListening();
    };
  }, []);

  return (
    <main style={{ maxWidth: 500, margin: "40px auto", padding: 16, fontFamily: "sans-serif" }}>
      <h1>My Tasks</h1>

      <TaskForm setErrorMessage={setErrorMessage} />

      {errorMessage !== "" && <p style={{ color: "red" }}>{errorMessage}</p>}

      <TaskList tasks={tasks} loading={loading} setErrorMessage={setErrorMessage} />
    </main>
  );
}
