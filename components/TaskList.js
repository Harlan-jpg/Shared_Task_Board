import TaskItem from "./TaskItem";

export default function TaskList({ tasks, loading, setErrorMessage }) {
  if (loading) {
    return <p>Loading tasks...</p>;

  }

  if (tasks.length === 0) {
    return <p>No tasks yet. Add one above!</p>;

  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>

      {/* key helps react tell the rows apart */}

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} setErrorMessage={setErrorMessage} />

      ))}
    </ul>
    
  );
}
