import { axios } from "@/lib/axios";
import { FieldGroup } from "@/types";


export interface  GetObservationFieldGroupsOptions  {
  observationId: number;
};

export const getObservationFieldGroups = ({ observationId }: GetObservationFieldGroupsOptions): Promise<FieldGroup[]> => {
  return axios.get(`/observations/${observationId}/field_groups`);
};

export interface  GetObservationFieldGroupOptions {
  observationId: number;
  fieldGroupId: number;
};

export const getObservationFieldGroup = ({ observationId, fieldGroupId }: GetObservationFieldGroupOptions): Promise<FieldGroup> => {
  return axios.get(`/observations/${observationId}/field_groups/${fieldGroupId}`);
};

export interface CreateObservationFieldGroupOptions  {
  observationId: number;
  name: string;
  logical_operator: string;
  type: string;
};

export const createObservationFieldGroup: (data: CreateObservationFieldGroupOptions) => Promise<FieldGroup> = ({observationId, name, type, logical_operator }:CreateObservationFieldGroupOptions):Promise<FieldGroup> =>{
  return axios.post(`/observations/${observationId}/field_groups`, {
    name,
    type,
    logical_operator,
  });
};

export interface UpdateObservationFieldGroupOptions  {
  observationId: number;
  fieldGroupId: number;
  logical_operator: string;
  name: string;
  type: string;
};

export const updateObservationFieldGroup = ({ observationId, fieldGroupId, name, type, logical_operator }: UpdateObservationFieldGroupOptions): Promise<FieldGroup> => {
  return axios.post(`/observations/${observationId}/field_groups/${fieldGroupId}`, { name, type, logical_operator });
};

export interface DeleteObservationFieldGroupOptions  {
  fieldGroupId: number;
  observationId: number;
};

export const deleteObservationFieldGroup = ({ fieldGroupId, observationId }: DeleteObservationFieldGroupOptions) => {
  return axios.delete(`/observations/${observationId}/field_groups/${fieldGroupId}`);
};
