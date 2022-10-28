import React, { useReducer } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskList from "../../components/task-list/TaskList";
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
import { useSettings } from "../../context/settingsContext";
import SettingsForm from "../../components/settings-form/SettingsForm";
import Modal from "../../components/modal/Modal";

export const TasksBoard = () => {
  // reducer for tasks
  const [tasks, dispatch] = useReducer(
    taskReducer,
    groupTasksByStatus(sortTasksByPriority(TASKS))
  );
  const { transitionBoard } = useSettings();
  const [showSettings, setShowSettings] = React.useState(false);

  const handleReorder = (result: DropResult) => {
    dispatch({
      type: TaskActions.REORDER_TASKS,
      payload: {
        result,
        tasks,
        transitionBoard: transitionBoard!,
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
                  allowedSources={transitionBoard?.[status as TaskStatus] || []}
                  onAddTask={handleAddTask}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              ))
            )}
        </div>
      </DragDropContext>
      <button
        type="button"
        className="w-12 h-12 fixed bottom-4 left-2 bg-white rounded-full shadow-md"
        onClick={() => setShowSettings(true)}
      >
        <img src={settingsIcon} alt="settings icon" />
      </button>
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title=""
      >
        <SettingsForm onCancel={() => setShowSettings(false)} />
      </Modal>
    </div>
  );
};
