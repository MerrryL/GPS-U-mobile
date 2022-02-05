import { axios } from "@/lib/axios";
import { LocationActivityType } from "expo-location";

import { Task } from "@/types";

//Tasks part
export const getTasks = (): Promise<Task[]> => {
  return axios.get("tasks");
};

type GetTaskOptions = {
  taskId: string;
};

export const getTask = ({ taskId }: GetTaskOptions): Promise<Task> => {
  return axios.get(`/tasks/${taskId}`);
};

type TaskBody = {
  comment: string;
};

type CreateTaskOptions = {
  data: TaskBody;
};

export const createTask = ({
  // localization,
  data,
}: CreateTaskOptions): Promise<Task> => {
  return axios.post("tasks", { data });
};

type UpdateTaskOptions = {
  taskId: string;
  data: Task;
};

export const updateTask = ({ data, taskId }: UpdateTaskOptions): Promise<Task> => {
  return axios.patch(`tasks/${taskId}`, data);
};

type DeleteTaskOptions = {
  taskId: string;
};

export const deleteTask = ({ taskId }: DeleteTaskOptions) => {
  return axios.delete(`tasks/${taskId}`);
};
