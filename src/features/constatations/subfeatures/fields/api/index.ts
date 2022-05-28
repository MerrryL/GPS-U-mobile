import { axios } from "@/lib/axios";
import { Field } from "@/types";

type GetFieldsOptions = {
  fieldGroupId?: string;
};

//TODO: this points to Index on the api instead of a "show"
export const getFields = ({ fieldGroupId = null }: GetFieldsOptions): Promise<Field[]> => {
  let filter = "";
  if (fieldGroupId) {
    filter += "?filter[field_group_id]=" + fieldGroupId;
  }
  return axios.get("/fields" + filter);
};

type GetFieldOptions = {
  fieldId: string;
};

export const getField = ({ fieldId }: GetFieldOptions): Promise<Field> => {
  return axios.get(`/fields/${fieldId}`);
};

type CreateFieldOptions = {
  constatationId: number;
  fieldGroupId: string;
  name: string;
  type: string;
  isDefault: boolean;
  value: string;
};

export const createField = ({ constatationId, fieldGroupId, name, type, isDefault, value }: CreateFieldOptions): Promise<Field> => {
  return axios.post("/fields/", {
    name,
    type,
    isDefault,
    value,
    fieldGroupId,
    constatationId,
  });
};

type DeleteFieldOptions = {
  fieldId: string;
  fieldGroupId: string;
  constatationId: number;
};

export const deleteField = ({ fieldId, fieldGroupId, constatationId }: DeleteFieldOptions) => {
  return axios.delete(`fields/${fieldId}`);
};
