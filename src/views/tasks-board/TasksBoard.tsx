import React, { useReducer, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskList from "../../components/task-list/TaskList";
import { TransitionBoard, TRANSITION_BOARD } from "../../mock-data/settings";
import { TASKS } from "../../mock-data/tasks";
import { TaskModel, TaskStatus } from "../../models/TaskModel";
import {
  groupTasksByStatus,
  Hash,
  sortTasksByPriority,
  TaskActions,
  taskReducer,
} from "./utils";
import settingsIcon from "../../assets/settings.svg";
import Modal from "../../components/modal/Modal";
import TaskForm from "../../components/task-form/TaskForm";

export const TasksBoard = () => {
  // reducer for tasks
  const [tasks, dispatch] = useReducer(
    taskReducer,
    groupTasksByStatus(sortTasksByPriority(TASKS))
  );

  const [isFormOpen, setIsFormOpen] = useState(false);

  // state for transition board
  const [boardSettings, setSettings] = useState<TransitionBoard>();

  useEffect(() => {
    setSettings(TRANSITION_BOARD);
  }, []);

  const handleReorder = (result: DropResult) => {
    dispatch({
      type: TaskActions.REORDER_TASKS,
      payload: {
        result,
        tasks,
        transitionBoard: boardSettings!,
      },
    });
  };

  const handleAddTask = (task: TaskModel, columnId: TaskStatus) => {
    dispatch({
      type: TaskActions.ADD_TASK,
      payload: { task, columnId },
    });
  };

  const handleDeleteTask = (taskId: number, columnId: TaskStatus) => {
    dispatch({
      type: TaskActions.DELETE_TASK,
      payload: { id: taskId, columnId },
    });
  };

  const handleEditTask = (
    taskId: number,
    columnId: TaskStatus,
    data: Hash<any>
  ) => {
    dispatch({
      type: TaskActions.UPDATE_TASK,
      payload: { taskId: taskId, columnId, data },
    });
  };

  return (
    <div className="flex flex-col">
      <header className="w-full flex gap-6 pt-6 pl-4 md:pl-6 lg:pl-8">
        <button
          className="bg-blue-600 text-white rounded-md p-2 shadow-sm hover:shadow-md text-xl font-medium"
          onClick={() => {}}
        >
          Import
        </button>
        <button className="bg-gray-100 border border-gray-200 rounded-md px-2 shadow-sm hover:shadow text-xl font-medium">
          Export
        </button>
      </header>
      <DragDropContext onDragEnd={handleReorder}>
        <div className="w-fit flex justify-start gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8">
          {tasks &&
            React.Children.toArray(
              Object.keys(TaskStatus).map((status) => (
                <TaskList
                  status={status as TaskStatus}
                  tasks={tasks[status] || []}
                  allowedSources={boardSettings?.[status as TaskStatus] || []}
                  onAddTask={handleAddTask}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              ))
            )}
        </div>
      </DragDropContext>
      <button className="w-12 h-12 fixed bottom-4 left-2 bg-white rounded-full shadow-md">
        <img src={settingsIcon} alt="settings icon" />
      </button>
    </div>
  );
};
