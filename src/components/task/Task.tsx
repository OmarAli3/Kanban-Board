import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskModel, TaskStatus } from "../../models/TaskModel";
import { Hash } from "../../views/tasks-board/utils";
import Modal from "../modal/Modal";
import TaskForm from "../task-form/TaskForm";

type TaskProps = {
  taskData: TaskModel;
  columnId: string;
  index: number;
  onDeleteTask: (taskId: number, columnId: TaskStatus) => void;
  onClick: () => void;
};
export default function Task(props: TaskProps) {
  const { taskData, index, columnId, onDeleteTask, onClick } = props;
  return (
    <Draggable draggableId={`${columnId}-task-${taskData.id}`} index={index}>
      {(provided) => (
        <div
          className="bg-gray-50 rounded-md p-2 shadow-sm hover:shadow-md hover:bg-white flex items-center gap-2 justify-between"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={onClick}
        >
          {taskData.title}
          <button
            type="button"
            className="h-fit rounded-md px-2 text-sm font-medium text-red-400"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTask(taskData.id, columnId as TaskStatus);
            }}
          >
            x
          </button>
        </div>
      )}
    </Draggable>
  );
}
