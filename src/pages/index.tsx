import { Task, Gantt } from "../components/Gantt";

export default function Home() {
  const tasks: Task[] = [
    {
      id: "Task 1",
      name: "Redesign website",
      start: "2016-12-28",
      end: "2016-12-31",
      progress: 20,
      // dependencies: 'Task 2, Task 3'
    },
  ];

  return (
    <>
      <main>
        <Gantt tasks={tasks} />
      </main>
    </>
  );
}
