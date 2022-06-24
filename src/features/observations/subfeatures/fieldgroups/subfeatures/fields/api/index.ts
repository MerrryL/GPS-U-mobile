import { axios } from "@/lib/axios";
import { Field } from "@/types";

interface GetFieldsOptions {
  observationId: number;
  fieldGroupId: number;
};

//TODO: this points to Index on the api instead of a "show"
export const getFields = ({ observationId, fieldGroupId }: GetFieldsOptions): Promise<Field[]> => {
  return axios.get(`/observations/${observationId}/field_groups/${fieldGroupId}/fields`);
};

interface GetFieldOptions {
  observationId: number;
  fieldGroupId: number;
  fieldId: number;
};

export const getField = ({ observationId, fieldGroupId, fieldId }: GetFieldOptions): Promise<Field> => {
  return axios.get(`/observations/${observationId}/field_groups/${fieldGroupId}/fields/${fieldId}`);
};

interface CreateFieldOptions {
  observationId: number;
  fieldGroupId: number;
  name: string;
  default_value: string;
  is_required: boolean;
};

export const createField = ({ observationId, fieldGroupId, name, default_value, is_required }: CreateFieldOptions): Promise<Field> => {
  return axios.post(`/observations/${observationId}/field_groups/${fieldGroupId}/fields/`, { name, default_value, is_required });
};

interface DeleteFieldOptions {
  fieldId: number;
  fieldGroupId: number;
  observationId: number;
};

export const deleteField = ({ fieldId, fieldGroupId, observationId }: DeleteFieldOptions) => {
  return axios.delete(`/observations/${observationId}/field_groups/${fieldGroupId}/fields/${fieldId}`);
};
