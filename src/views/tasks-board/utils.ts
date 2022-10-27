import { DropResult } from "react-beautiful-dnd";
import { TransitionBoard } from "../../mock-data/settings";
import { TaskModel, TaskStatus } from "../../models/TaskModel";

export type Hash<T> = { [key: string]: T };

// Group tasks by some property
export const groupTasks = (getKey: (tasks: TaskModel) => string) => {
  return (tasks: TaskModel[]) => {
    return tasks.reduce((mappedTasks: Hash<TaskModel[]>, task) => {
      const key = getKey(task);
      if (!mappedTasks[key]) mappedTasks[key] = [];
      mappedTasks[key].push(task);
      return mappedTasks;
    }, {});
  };
};

export const groupTasksByStatus = groupTasks((task) => task.status);

export const reorderTasks = (
  result: DropResult,
  tasks: Hash<TaskModel[]>,
  transitionBoard: TransitionBoard
) => {
  const { source, destination } = result;
  if (!destination) return;

  const sourceColumn = tasks[source.droppableId];
  const destinationColumn = tasks[destination.droppableId];
  const sourceColumnId = source.droppableId as TaskStatus;
  const destinationColumnId = destination.droppableId as TaskStatus;

  // Don't allow reordering within the same column as we want to keep the order of tasks by priority
  if (sourceColumnId === destinationColumnId) return;
  if (transitionBoard[destinationColumnId].indexOf(sourceColumnId) === -1)
    return;

  // Remove the task from the source column
  const task = sourceColumn[source.index];

  // Add the task to the destination column
  const newSourceColumn = sourceColumn.slice();
  newSourceColumn.splice(result.source.index, 1);

  // Add the task to the destination column
  // Sort the destination column by priority after adding the task
  const newDestinationColumn = sortTasksByPriority([
    ...destinationColumn,
    task,
  ]);

  const newState = {
    ...tasks,
    [source.droppableId]: newSourceColumn,
    [destination.droppableId]: newDestinationColumn,
  };

  return newState;
};

export const sortTasksByPriority = (tasks: TaskModel[]) => {
  return [...tasks].sort((a, b) => b.priority - a.priority);
};

export enum TaskActions {
  ADD_TASK = "ADD_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  DELETE_TASK = "DELETE_TASK",
  REORDER_TASKS = "REORDER_TASKS",
}

export type TaskAction =
  | {
      type: TaskActions.ADD_TASK;
      payload: { task: TaskModel; columnId: TaskStatus };
    }
  | {
      type: TaskActions.UPDATE_TASK;
      payload: { columnId: TaskStatus; taskId: number; data: Hash<any> };
    }
  | {
      type: TaskActions.DELETE_TASK;
      payload: { columnId: TaskStatus; id: number };
    }
  | {
      type: TaskActions.REORDER_TASKS;
      payload: {
        result: DropResult;
        tasks: Hash<TaskModel[]>;
        transitionBoard: TransitionBoard;
      };
    };

export const taskReducer = (state: Hash<TaskModel[]>, action: TaskAction) => {
  switch (action.type) {
    case TaskActions.ADD_TASK: {
      const { task, columnId } = action.payload;

      return {
        ...state,
        [columnId]: sortTasksByPriority([...state[columnId], task]),
      };
    }
    case TaskActions.UPDATE_TASK: {
      const { columnId, taskId, data } = action.payload;
      const task = state[columnId].find((task) => task.id === taskId);
      Object.assign(task!, data);
      if (!!data.status && data.status !== columnId) {
        const newColumn = state[data.status];
        const newSourceColumn = state[columnId]?.filter(
          (task) => task.id !== taskId
        );
        return {
          ...state,
          [columnId]: newSourceColumn,
          [data.status]: sortTasksByPriority([...(newColumn || []), task!]),
        };
      }
      return {
        ...state,
        [columnId]: sortTasksByPriority(state[columnId]),
      };
    }
    case TaskActions.DELETE_TASK: {
      const { id } = action.payload;
      const column = state[action.payload.columnId];
      const newColumn = column.filter((task) => task.id !== id);
      return {
        ...state,
        [action.payload.columnId]: newColumn,
      };
    }
    case TaskActions.REORDER_TASKS: {
      const { result, tasks, transitionBoard } = action.payload;
      return reorderTasks(result, tasks, transitionBoard) || state;
    }
    default:
      return state;
  }
};
