import { axios } from "@/lib/axios";
import { LocationActivityType } from "expo-location";

import { FieldGroup } from "../types";

//FieldGroupsPart

type GetFieldGroupsOptions = {
  constatationId?: string;
};

//TODO: this points to Index on the api instead of a "show"
export const getFieldGroups = ({
  constatationId = null,
}: GetFieldGroupsOptions): Promise<FieldGroup[]> => {
  let filter = "";
  if (constatationId) {
    filter+="?filter[constatation_id]="+constatationId;
  }
  return axios.get('/field_groups' + filter);
};

type GetFieldGroupOptions = {
  fieldGroupId: string;
};

export const getFieldGroup = ({
  fieldGroupId,
}: GetFieldGroupOptions): Promise<FieldGroup> => {
  return axios.get(`/field_groups/${fieldGroupId}`);
};

type CreateFieldGroupOptions = {
  constatationId: string;
  name: string;
  type: string;
  logical_operator: string;
};

export const createFieldGroup = ({
  constatationId,
  name,
  type,
  logical_operator,
}: CreateFieldGroupOptions): Promise<FieldGroup> => {
  return axios.post("/field_groups/", { name, type, logical_operator, constatationId });
};

type DeleteFieldGroupOptions = {
  fieldGroupId: string;
  constatationId: string;
};

export const deleteFieldGroup = ({ fieldGroupId, constatationId }: DeleteFieldGroupOptions) => {
  return axios.delete(`field_groups/${fieldGroupId}`);
};