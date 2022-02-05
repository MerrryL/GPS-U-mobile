import { axios } from "@/lib/axios";
import { Followup } from "@/types";

//Followups part
export const getFollowups = (): Promise<Followup[]> => {
  return axios.get("followups");
};

type GetFollowupOptions = {
  followupId: string;
};

export const getFollowup = ({
  followupId,
}: GetFollowupOptions): Promise<Followup> => {
  return axios.get(`/followups/${followupId}`);
};

type FollowupBody = {
  comment: string;
};

type CreateFollowupOptions = {
  data: FollowupBody;
};

export const createFollowup = ({
  // localization,
  data,
}: CreateFollowupOptions): Promise<Followup> => {
  return axios.post("followups", { data });
};

type UpdateFollowupOptions = {
  followupId: string;
  data: Followup;
};

export const updateFollowup = ({
  data,
  followupId,
}: UpdateFollowupOptions): Promise<Followup> => {
  return axios.patch(`followups/${followupId}`, data);
};

type DeleteFollowupOptions = {
  followupId: string;
};

export const deleteFollowup = ({ followupId }: DeleteFollowupOptions) => {
  return axios.delete(`followups/${followupId}`);
};
