import { axios } from "@/lib/axios";
import { Field } from "@/types";

type GetFieldsOptions = {
  observationId: number;
  fieldGroupId: number;
};

//TODO: this points to Index on the api instead of a "show"
export const getFields = ({ observationId, fieldGroupId }: GetFieldsOptions): Promise<Field[]> => {
  return axios.get(`/observations/${observationId}/field_groups/${fieldGroupId}/fields`);
};

type GetFieldOptions = {
  observationId: number;
  fieldGroupId: number;
  fieldId: string;
};

export const getField = ({ observationId, fieldGroupId, fieldId }: GetFieldOptions): Promise<Field> => {
  return axios.get(`/observations/${observationId}/field_groups/${fieldGroupId}/fields/${fieldId}`);
};

type CreateFieldOptions = {
  observationId: number;
  fieldGroupId: number;
  name: string;
  type_id: number;
  defaultValue: string;
  isRequired: boolean;
};

export const createField = ({ observationId, fieldGroupId, name, type_id, defaultValue, isRequired }: CreateFieldOptions): Promise<Field> => {
  return axios.post(`/observations/${observationId}/field_groups/${fieldGroupId}/fields/`, { name, type_id, defaultValue, isRequired });
};

type DeleteFieldOptions = {
  fieldId: number;
  fieldGroupId: number;
  observationId: number;
};

export const deleteField = ({ fieldId, fieldGroupId, observationId }: DeleteFieldOptions) => {
  return axios.delete(`/observations/${observationId}/field_groups/${fieldGroupId}/fields/${fieldId}`);
};
