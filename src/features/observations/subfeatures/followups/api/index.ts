import { axios } from "@/lib/axios";

import { Observation, Followup } from "@/types";

type GetFollowupsOptions = {
  observationId: string;
};

export const getFollowups = ({
  observationId,
}: GetFollowupsOptions): Promise<Followup[]> => {
  return axios.get(`/observations/${observationId}/followups`);
};

type GetFollowupOptions = {
  observationId: string,
  followupId: string;
};

export const getFollowup = ({
  observationId,
  followupId,
}: GetFollowupOptions): Promise<Followup> => {
  return axios.get(`/observations/${observationId}/followups/${followupId}`);
};

type CreateFollowupOptions = {
  observationId: string;
  name: string;
  description:string;
};

export const createFollowup = ({
  observationId,
  name,
  description
}: CreateFollowupOptions): Promise<Followup> => {
  return axios.post(`/observations/${observationId}/followups`, { name, description });
};

type UpdateFollowupOptions = {
  observationId: string;
  followupId: string;
  name: string;
  description: string;
};

export const updateFollowup = ({
  observationId,
  followupId,
  name,
  description
}: UpdateFollowupOptions): Promise<Followup> => {
  return axios.post(`/observations/${observationId}/followups/${followupId}`, { name, description});
};

type DeleteFollowupOptions = {
  followupId: string;
  observationId: string;
};

export const deleteFollowup = ({ followupId, observationId }: DeleteFollowupOptions) => {
  return axios.delete(`/observations/${observationId}/followups/${followupId}`);
};