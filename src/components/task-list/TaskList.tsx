import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { TaskModel, TaskStatus } from "../../models/TaskModel";
import { Hash } from "../../views/tasks-board/utils";
import Modal from "../modal/Modal";
import TaskForm from "../task-form/TaskForm";
import Task from "../task/Task";
import { getStatusName } from "./utils";

type TaskListProps = {
  status: TaskStatus;
  tasks: TaskModel[];
  allowedSources: TaskStatus[];
  onAddTask: (task: TaskModel, columnId: TaskStatus) => void;
  onDeleteTask: (taskId: number, columnId: TaskStatus) => void;
  onEditTask: (taskId: number, columnId: TaskStatus, data: Hash<any>) => void;
};
export default function TaskList(props: TaskListProps) {
  const { status, tasks, allowedSources, onAddTask, onDeleteTask, onEditTask } =
    props;

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<TaskModel>();
  const clearFormData = () => setFormData(undefined);
  const closeForm = () => {
    clearFormData();
    setIsFormOpen(false);
  };
  const handleSubmitForm = (data: TaskModel) => {
    if (formData) {
      onEditTask(formData.id, status, data);
    } else {
      onAddTask(data, data.status || status);
    }
    closeForm();
  };

  const isFromValidSource = (taskId: string = status) => {
    return allowedSources.includes(taskId as TaskStatus);
  };
  const getDraggedTaskStatus = (taskId?: string) => {
    return taskId?.split("-")[0];
  };
  return (
    <div className="min-h-screen w-80 flex flex-col gap-4">
      <div className="bg-gray-300 p-2 rounded-sm flex justify-between items-center">
        <h2 className="text-xl font-medium text-gray-700">
          {getStatusName(status)}
        </h2>
        <button
          type="button"
          className="h-fit bg-gray-100 rounded-md px-2 shadow-sm hover:shadow-md text-xl font-medium"
          onClick={() => {
            setIsFormOpen(true);
          }}
        >
          +
        </button>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            className={`relative h-full flex flex-col gap-2  p-2 pb-10 rounded-sm ring-2 ring-transparent ${
              snapshot.isDraggingOver ? "bg-gray-200" : "bg-gray-300"
            }
            ${
              snapshot.isDraggingOver &&
              (!isFromValidSource(
                getDraggedTaskStatus(snapshot.draggingOverWith)
              )
                ? "after:content-[''] after:absolute after:inset-0 after:bg-gray-500 after:bg-opacity-30"
                : "ring-green-300")
            }
            `}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {React.Children.toArray(
              tasks.map((task, index) => (
                <Task
                  taskData={task}
                  index={index}
                  columnId={status}
                  onDeleteTask={onDeleteTask}
                  onClick={() => {
                    setFormData(task);
                    setIsFormOpen(true);
                  }}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Modal isOpen={isFormOpen} onClose={closeForm} title="">
        <TaskForm
          onSubmit={handleSubmitForm}
          task={formData}
          columnId={status}
          onCancel={closeForm}
        />
      </Modal>
    </div>
  );
}
