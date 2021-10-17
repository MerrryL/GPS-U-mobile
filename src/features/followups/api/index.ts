import { axios } from "@/lib/axios";
import { LocationActivityType } from "expo-location";

import { Followup } from "@/types";

//FollowupsPart

type GetFollowupsOptions = {
  constatationId?: string;
};

//TODO: this points to Index on the api instead of a "show"
export const getFollowups = ({
  constatationId = null,
}: GetFollowupsOptions): Promise<Followup[]> => {
  let filter = "";
  if (constatationId) {
    filter+="?filter[constatation_id]="+constatationId;
  }
  return axios.get('/followups' + filter);
};

type GetFollowupOptions = {
  fieldGroupId: string;
};

export const getFollowup = ({
  fieldGroupId,
}: GetFollowupOptions): Promise<Followup> => {
  return axios.get(`/followups/${fieldGroupId}`);
};

type CreateFollowupOptions = {
  constatationId: string;
  name: string;
  type: string;
  logical_operator: string;
};

export const createFollowup = ({
  constatationId,
  name,
  type,
  logical_operator,
}: CreateFollowupOptions): Promise<Followup> => {
  return axios.post("/followups/", { name, type, logical_operator, constatationId });
};

type DeleteFollowupOptions = {
  fieldGroupId: string;
  constatationId: string;
};

export const updateFollowup = () => {
  
}

export const deleteFollowup = ({ fieldGroupId, constatationId }: DeleteFollowupOptions) => {
  return axios.delete(`followups/${fieldGroupId}`);
};