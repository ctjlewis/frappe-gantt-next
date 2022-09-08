/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createRef, useEffect, useState } from "react";
import { FrappeGantt } from "../../lib";
import { GanttTask, Task } from "./Task";
import { Moment } from "moment";
import { ViewMode } from "./ViewMode";

const ganttDefaultProps = {
  onTasksChange: (tasks: Task[]) => {},
  onClick: (task: Task) => {},
  onDateChange: (task: Task, start: Moment, end: Moment) => {},
  onProgressChange: (task: Task, progress: number) => {},
  onViewChange: (mode: ViewMode) => {}
};

export type GanttOptionalProps = Readonly<typeof ganttDefaultProps>;

export type GanttProps = {
  tasks: Task[];
  viewMode: ViewMode;
} & Partial<GanttOptionalProps>;

export const Gantt = ({
  tasks,
  viewMode,
  onTasksChange,
  onClick,
  onDateChange,
  onProgressChange,
  onViewChange
}: GanttProps) => {
  const ganttRef = createRef<HTMLDivElement>();
  const svgRef = createRef<SVGSVGElement>();

  useEffect(
    () => {
      const gantt = new FrappeGantt(
        svgRef.current,
        tasks,
        {
          on_click: onClick,
          on_view_change: onViewChange,
          on_progress_change: (task: Task, progress: number) => {
            onProgressChange?.(task, progress);
            onTasksChange?.(tasks);
          },
          on_date_change: (task: Task, start: Moment, end: Moment) => {
            onDateChange?.(task, start, end);
            onTasksChange?.(tasks);
          }
        }
      );

      gantt.change_view_mode(viewMode);

      const midOfSvg = svgRef.current.clientWidth * 0.5;
      ganttRef.current.scrollLeft = midOfSvg;
    },
    [
      ganttRef,
      onClick,
      onDateChange,
      onProgressChange,
      onTasksChange,
      onViewChange,
      svgRef,
      tasks,
      viewMode
    ],
  );

  return (
    <div ref={ganttRef} style={{
      overflow: "scroll",
      width: "100%",
      height: "100%"
    }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      />
    </div>
  );
};

export * from "./Task";
export * from "./ViewMode";