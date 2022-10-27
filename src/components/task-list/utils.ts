import { TaskStatus } from "../../models/TaskModel";

export const getStatusName = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.BACKLOG:
      return "Backlog";
    case TaskStatus.TODO:
      return "To Do";
    case TaskStatus.IN_PROGRESS:
      return "In Progress";
    case TaskStatus.IN_REVIEW:
      return "In Review";
    case TaskStatus.DONE:
      return "Done";
    default:
      return "";
  }
};
