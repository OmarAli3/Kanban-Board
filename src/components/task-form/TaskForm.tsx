import { useState } from "react";
import { useSettings } from "../../context/settingsContext";
import { TaskModel, TaskPriority, TaskStatus } from "../../models/TaskModel";
import { getStatusName } from "../task-list/utils";
import { filterOutEnumNumbers, getAllowedColumns } from "./util";

type TaskFormProps = {
  task?: TaskModel;
  columnId: TaskStatus;
  onSubmit: (task: TaskModel) => void;
  onCancel: () => void;
};
export default function TaskForm(props: TaskFormProps) {
  const { task, columnId, onSubmit, onCancel } = props;
  const { transitionBoard } = useSettings();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority || TaskPriority.LOW
  );
  const [status, setStatus] = useState<TaskStatus>(columnId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskData = {
      id: task?.id || Date.now(),
      title,
      description,
      priority,
      status,
    };
    onSubmit(new TaskModel(taskData));
  };
  const inputLabelClasses = "text-sm font-medium text-gray-700";
  const inputClasses =
    "block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm";

  const isEdit = !!task;
  const allowedColumns = getAllowedColumns(
    transitionBoard!,
    isEdit ? columnId : undefined
  );
  allowedColumns.unshift(columnId);
  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className={inputLabelClasses} htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          className={inputClasses}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className={inputLabelClasses} htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className={inputClasses}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className={inputLabelClasses} htmlFor="priority">
          Priority
        </label>

        <select
          name="priority"
          id="priority"
          value={priority}
          className={inputClasses}
          onChange={(e) => setPriority(Number(e.target.value) as TaskPriority)}
        >
          {filterOutEnumNumbers(TaskPriority).map((priority, i) => (
            <option key={priority} value={i + 1}>
              {priority}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className={inputLabelClasses} htmlFor="status">
          Status
        </label>
        <select
          name="status"
          id="status"
          value={status}
          className={inputClasses}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          {allowedColumns.map((status) => (
            <option key={status} value={status}>
              {getStatusName(status)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!title || !description || !priority || !status}
        className="bg-blue-600 disabled:bg-gray-400 text-white rounded-md p-2 shadow-sm hover:shadow-md text-xl font-medium"
      >
        {task ? "Save" : "Add"}
      </button>
      <button
        type="button"
        className="bg-white text-gray-700 rounded-md p-2 shadow-sm hover:shadow-md text-xl font-medium"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}
