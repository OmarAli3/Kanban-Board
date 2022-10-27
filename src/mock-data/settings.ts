import { TaskStatus } from "../models/TaskModel";

// Adjacency list represents ech column and the allowed transitions
export const TRANSITION_BOARD = {
  [TaskStatus.BACKLOG]: [TaskStatus.TODO],
  [TaskStatus.TODO]: [TaskStatus.BACKLOG, TaskStatus.IN_PROGRESS],
  [TaskStatus.IN_PROGRESS]: [
    TaskStatus.BACKLOG,
    TaskStatus.TODO,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE,
  ],
  [TaskStatus.IN_REVIEW]: [
    TaskStatus.BACKLOG,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ],
  [TaskStatus.DONE]: [TaskStatus.IN_REVIEW],
};

export type TransitionBoard = {
  BACKLOG: TaskStatus[];
  TODO: TaskStatus[];
  IN_PROGRESS: TaskStatus[];
  IN_REVIEW: TaskStatus[];
  DONE: TaskStatus[];
};
