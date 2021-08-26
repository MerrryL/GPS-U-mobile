import { axios } from "@/lib/axios";

import { Field } from "../types";

//FieldsPart

type GetFieldsOptions = {
  constatationId?: string;
};

//TODO: this points to Index on the api instead of a "show"
export const getFields = ({
  constatationId = null,
}: GetFieldsOptions): Promise<Field[]> => {
  let filter = "";
  if (constatationId) {
    filter+="?filter[constatation_id]="+constatationId;
  }
  return axios.get('/fields' + filter);
};

type GetFieldOptions = {
  fieldId: string;
};

export const getField = ({
  fieldId,
}: GetFieldOptions): Promise<Field> => {
  return axios.get(`/fields/${fieldId}`);
};

type CreateFieldOptions = {
  constatationId: string;
  fieldGroupId: string;
  name: string;
  type: string;
  logical_operator: string;
};

export const createField = ({
  constatationId,
  fieldGroupId,
  name,
  type,
  logical_operator,
}: CreateFieldOptions): Promise<Field> => {
  return axios.post("/fields/", { name, type, logical_operator, fieldGroupId, constatationId });
};

type DeleteFieldOptions = {
  fieldGroupId: string;
  constatationId: string;
};

export const deleteField = ({ fieldGroupId, constatationId }: DeleteFieldOptions) => {
  return axios.delete(`fields/${fieldGroupId}`);
};