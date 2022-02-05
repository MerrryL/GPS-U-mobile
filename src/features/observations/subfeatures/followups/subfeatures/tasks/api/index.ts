import { axios } from "@/lib/axios";
import { Task, Operator, TaskStatus } from "@/types";

export const getTaskStatuses = (): Promise<TaskStatus[]> => {
  return axios.get(`/task_status/`);
};

export const getOperators = (): Promise<Operator[]> => {
  return axios.get(`/operators/`);
};

type GetTasksOptions = {
  observationId: string;
  followupId: string;
};

//TODO: this points to Index on the api instead of a "show"
export const getTasks = ({ observationId, followupId }: GetTasksOptions): Promise<Task[]> => {
  return axios.get(`/observations/${observationId}/followups/${followupId}/tasks`);
};

type GetTaskOptions = {
  observationId: string;
  followupId: string;
  taskId: string;
};

export const getTask = ({ observationId, followupId, taskId }: GetTaskOptions): Promise<Task> => {
  return axios.get(`/observations/${observationId}/followups/${followupId}/tasks/${taskId}`);
};

type CreateTaskOptions = {
  observationId: string;
  followupId: string;
  name: string;
  description: string;
  realisation_date: string;
  report_date: string;
  report_periodicity: string;
  task_status_id: string;
  //TODO: fix the any
  operators_id: any;
};

export const createTask = ({ observationId, followupId, name, description, realisation_date, report_date, report_periodicity, task_status_id, operators_id }: CreateTaskOptions): Promise<Task> => {
  return axios.post(`/observations/${observationId}/followups/${followupId}/tasks/`, {
    name,
    description,
    realisation_date,
    report_date,
    report_periodicity,
    task_status_id,
    operators_id,
  });
};

type DeleteTaskOptions = {
  taskId: string;
  followupId: string;
  observationId: string;
};

export const deleteTask = ({ taskId, followupId, observationId }: DeleteTaskOptions) => {
  return axios.delete(`/observations/${observationId}/followups/${followupId}/tasks/${taskId}`);
};
