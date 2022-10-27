import { TransitionBoard } from "../../mock-data/settings";
import { TaskStatus } from "../../models/TaskModel";

export const filterOutEnumNumbers = (enumObj: any) => {
  return Object.keys(enumObj).filter((key) => isNaN(Number(key)));
};

export const getAllowedColumns = (
  transitionBoard: TransitionBoard,
  sourceColumn?: TaskStatus
) => {
  const allowedColumns: TaskStatus[] = [];
  if (!sourceColumn) return Object.values(TaskStatus);
  for (const [key, value] of Object.entries(transitionBoard)) {
    if (value.includes(sourceColumn)) {
      allowedColumns.push(key as TaskStatus);
    }
  }
  return allowedColumns;
};
