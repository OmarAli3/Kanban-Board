import { BaseModel } from "./BaseModel";
import { UserModel } from "./UserModel";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export enum TaskPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  URGENT = 4,
}

export class TaskModel extends BaseModel {
  private _title: string;
  private _description: string;
  private _status: string;
  private _priority?: number;
  private _assignee?: UserModel;

  constructor(args: any) {
    super(args);
    this._title = args?.title;
    this._description = args?.description;
    this._status = args?.status || TaskStatus.BACKLOG;
    this._priority = args?.priority || TaskPriority.LOW;
    if (!!args?.assignee) this._assignee = new UserModel(args?.assignee);
  }

  get title() {
    return this._title;
  }
  set title(newTitle: string) {
    this._title = newTitle;
  }

  get description() {
    return this._description;
  }
  set description(newDescription: string) {
    this._description = newDescription;
  }

  get status(): TaskStatus {
    return this._status as TaskStatus;
  }
  set status(newStatus: string) {
    this._status = newStatus;
  }

  get priority(): TaskPriority {
    return this._priority as TaskPriority;
  }
  set priority(newPriority: number) {
    this._priority = newPriority;
  }

  get isBacklog() {
    return this._status === TaskStatus.BACKLOG;
  }
  get isTodo() {
    return this._status === TaskStatus.TODO;
  }
  get isInProgress() {
    return this._status === TaskStatus.IN_PROGRESS;
  }
  get isInReview() {
    return this._status === TaskStatus.IN_REVIEW;
  }
  get isDone() {
    return this._status === TaskStatus.DONE;
  }

  get isLowPriority() {
    return this._priority === TaskPriority.LOW;
  }
  get isMediumPriority() {
    return this._priority === TaskPriority.MEDIUM;
  }
  get isHighPriority() {
    return this._priority === TaskPriority.HIGH;
  }
  get isUrgentPriority() {
    return this._priority === TaskPriority.URGENT;
  }

  // @override
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      assignee: this._assignee?.toJSON(),
    };
  }
}
