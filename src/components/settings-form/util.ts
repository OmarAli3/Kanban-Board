import { TransitionBoard } from "../../mock-data/settings";
import { TaskStatus } from "../../models/TaskModel";
import { getAllowedColumns } from "../task-form/util";

// Check if starting from any of the statuses in the board, we can reach the target status(DONE)
export function isValidBoard(board: TransitionBoard): boolean {
  const allStatuses = Object.values(TaskStatus);
  for (const status of allStatuses) {
    if (!isPathExists(board, status)) {
      return false;
    }
  }
  return true;
}

// Check if the there is a path from the source status to the target status
export function isPathExists(
  board: TransitionBoard,
  source = TaskStatus.BACKLOG,
  target = TaskStatus.DONE
): boolean {
  const visited = new Set();
  const stack = [source];
  while (!!stack.length) {
    const currentStatus = stack.pop();
    if (!visited.has(currentStatus)) {
      visited.add(currentStatus);
      const neighbors = getAllowedColumns(board, currentStatus);
      stack.push(...neighbors);
    }
  }
  return visited.has(target);
}
