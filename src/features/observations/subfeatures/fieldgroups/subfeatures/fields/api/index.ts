import { axios } from "@/lib/axios";
import { Field } from "@/types";

type GetFieldsOptions = {
  observationId :string;
  fieldGroupId: string;
};

//TODO: this points to Index on the api instead of a "show"
export const getFields = ({
  observationId,
  fieldGroupId,
}: GetFieldsOptions): Promise<Field[]> => {
  return axios.get(`/observations/${observationId}/field_groups/${fieldGroupId}/fields`);
};

type GetFieldOptions = {
  observationId: string;
  fieldGroupId: string;
  fieldId: string;
};

export const getField = ({
  observationId,
  fieldGroupId,
  fieldId,
}: GetFieldOptions): Promise<Field> => {
  return axios.get(`/observations/${observationId}/field_groups/${fieldGroupId}/fields/${fieldId}`);
};

type CreateFieldOptions = {
  observationId: string;
  fieldGroupId: string;
  name: string;
  type: string;
  isDefault: boolean;
  value: string;
};

export const createField = ({
  observationId,
  fieldGroupId,
  name,
  type,
  isDefault,
  value,
}: CreateFieldOptions): Promise<Field> => {
  return axios.post(`/observations/${observationId}/field_groups/${fieldGroupId}/fields/`, { name, type, isDefault, value });
};

type DeleteFieldOptions = {
  fieldId: string;
  fieldGroupId: string;
  observationId: string;
};

export const deleteField = ({ fieldId, fieldGroupId, observationId }: DeleteFieldOptions) => {
  return axios.delete(`/observations/${observationId}/field_groups/${fieldGroupId}/fields/${fieldId}`);
};