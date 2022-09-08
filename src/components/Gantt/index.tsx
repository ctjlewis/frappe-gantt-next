// @ts-nocheck - Disable
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createRef } from "react";
import { FrappeGantt } from "../../lib";
import { GanttTask } from "./Task";
import { Moment } from "moment";
import { ViewMode } from "./ViewMode";

export type GanttProps = {
  tasks: Partial<GanttTask>[];
} & Partial<GanttOptionalProps>;

export type GanttOptionalProps = Readonly<typeof ganttDefaultProps>;

const ganttDefaultProps = {
  viewMode: ViewMode.Day,
  onTasksChange: (tasks: GanttTask[]) => {},
  onClick: (task: GanttTask) => {},
  onDateChange: (task: GanttTask, start: Moment, end: Moment) => {},
  onProgressChange: (task: GanttTask, progress: number) => {},
  onViewChange: (mode: ViewMode) => {}
};

export class Gantt extends React.Component<GanttProps, any> {
  private _target = createRef<HTMLDivElement>();
  private _svg = createRef<SVGSVGElement>();
  private _gantt: any = null;

  static defaultProps = ganttDefaultProps;

  state = {
    viewMode: null,
    tasks: []
  };

  static getDerivedStateFromProps(nextProps: GanttProps, state: any) {
    return {
      viewMode: nextProps.viewMode,
      tasks: nextProps.tasks.map(t => new GanttTask(t))
    };
  }

  componentDidUpdate() {
    if (this._gantt) {
      this._gantt.refresh(this.state.tasks);
      this._gantt.change_view_mode(this.state.viewMode);
    }
  }

  componentDidMount() {
    this._gantt = new FrappeGantt(this._svg.current, this.state.tasks, {
      on_click: this.props.onClick,
      on_view_change: this.props.onViewChange,
      on_progress_change: (task: GanttTask, progress: number) => {
        this.props.onProgressChange!(task, progress);
        this.props.onTasksChange!(this.props.tasks);
      },
      on_date_change: (task: GanttTask, start: Moment, end: Moment) => {
        this.props.onDateChange!(task, start, end);
        this.props.onTasksChange!(this.props.tasks);
      }
    });

    if (this._gantt) {
      this._gantt.change_view_mode(this.state.viewMode);
    }

    const midOfSvg = this._svg.current!.clientWidth * 0.5;
    this._target.current!.scrollLeft = midOfSvg;
  }

  render() {
    return (
      <div style={{ overflow: "scroll" }} ref={this._target}>
        <svg
          ref={this._svg}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        />
      </div>
    );
  }
}

export * from "./Task";
export * from "./ViewMode";