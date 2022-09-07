import Head from "next/head";
import { FrappeGantt } from "../components/FrappeGantt";
import { Task } from "../components/FrappeGantt/Task";

export default function Home() {
  const tasks: Task[] = [
    new Task({
      id: "Task 1",
      name: "Redesign website",
      start: "2016-12-28",
      end: "2016-12-31",
      progress: 20,
      // dependencies: 'Task 2, Task 3'
    }),
  ];

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <FrappeGantt tasks={tasks} />
      </main>
    </>
  );
}
