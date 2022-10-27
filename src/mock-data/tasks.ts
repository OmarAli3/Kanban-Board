import { TaskModel, TaskPriority, TaskStatus } from "../models/TaskModel";

export const TASKS = [
  new TaskModel({
    id: "1",
    title: "Task 1",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi impedit magnam velit vero explicabo quos esse delectus nobis. Illum fugiat libero magnam maiores iste doloribus dignissimos, beatae reprehenderit natus qui.",
    status: TaskStatus.BACKLOG,
  }),
  new TaskModel({
    id: "2",
    title: "Task 2",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi impedit magnam velit vero explicabo quos esse delectus nobis. Illum fugiat libero magnam maiores iste doloribus dignissimos, beatae reprehenderit natus qui.",
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
  }),
  new TaskModel({
    id: "3",
    title: "Task 3",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi impedit magnam velit vero explicabo quos esse delectus nobis. Illum fugiat libero magnam maiores iste doloribus dignissimos, beatae reprehenderit natus qui.",
    status: TaskStatus.TODO,
    priority: TaskPriority.HIGH,
    assignee: {
      id: "1",
      name: "John Doe",
      nickname: "johndoe",
      email: "johndoe@example.com",
    },
  }),
  new TaskModel({
    id: "4",
    title: "Task 4",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi impedit magnam velit vero explicabo quos esse delectus nobis. Illum fugiat libero magnam maiores iste doloribus dignissimos, beatae reprehenderit natus qui.",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    assignee: {
      id: "1",
      name: "John Doe",
      nickname: "johndoe",
      email: "johndoe@example.com",
    },
  }),
  new TaskModel({
    id: "5",
    title: "Task 5",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi impedit magnam velit vero explicabo quos esse delectus nobis. Illum fugiat libero magnam maiores iste doloribus dignissimos, beatae reprehenderit natus qui.",
    status: TaskStatus.IN_REVIEW,
    priority: TaskPriority.HIGH,
    assignee: {
      id: "1",
      name: "John Doe",
      nickname: "johndoe",
      email: "johndoe@example.com",
    },
  }),
  new TaskModel({
    id: "6",
    title: "Task 6",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi impedit magnam velit vero explicabo quos esse delectus nobis. Illum fugiat libero magnam maiores iste doloribus dignissimos, beatae reprehenderit natus qui.",
    status: TaskStatus.DONE,
    priority: TaskPriority.URGENT,
    assignee: {
      id: "1",
      name: "John Doe",
      nickname: "johndoe",
      email: "johndoe@example.com",
    },
  }),
];
