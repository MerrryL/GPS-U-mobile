import { axios } from "@/lib/axios";

import { Observation, Followup, Supervisor, FollowupStatus } from "@/types";

export const getFollowupStatuses = (): Promise<FollowupStatus[]> => {
  return axios.get(`/followup_status/`);
};

export const getSupervisors = (): Promise<Supervisor[]> => {
  return axios.get(`/supervisors/`);
};

type GetFollowupsOptions = {
  observationId: string;
};

export const getFollowups = ({ observationId }: GetFollowupsOptions): Promise<Followup[]> => {
  return axios.get(`/observations/${observationId}/followups`);
};

type GetFollowupOptions = {
  observationId: string;
  followupId: string;
};

export const getFollowup = ({ observationId, followupId }: GetFollowupOptions): Promise<Followup> => {
  return axios.get(`/observations/${observationId}/followups/${followupId}`);
};

type CreateFollowupOptions = {
  observationId: string;
  name: string;
  description: string;
  followup_status_id: string;
  supervisors_id: any;
};

export const createFollowup = ({ observationId, name, description, followup_status_id, supervisors_id }: CreateFollowupOptions): Promise<Followup> => {
  return axios.post(`/observations/${observationId}/followups`, {
    name,
    description,
    followup_status_id,
    supervisors_id,
  });
};

type UpdateFollowupOptions = {
  observationId: string;
  followupId: string;
  name: string;
  description: string;
};

export const updateFollowup = ({ observationId, followupId, name, description }: UpdateFollowupOptions): Promise<Followup> => {
  return axios.post(`/observations/${observationId}/followups/${followupId}`, {
    name,
    description,
  });
};

type DeleteFollowupOptions = {
  followupId: string;
  observationId: string;
};

export const deleteFollowup = ({ followupId, observationId }: DeleteFollowupOptions) => {
  return axios.delete(`/observations/${observationId}/followups/${followupId}`);
};
