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
  description: string;
};

export const createObservationFieldGroup: (data: CreateObservationFieldGroupOptions) => Promise<FieldGroup> = ({observationId, name, description }:CreateObservationFieldGroupOptions):Promise<FieldGroup> =>{
  return axios.post(`/observations/${observationId}/field_groups`, {
    name,
    description,
  });
};

export interface UpdateObservationFieldGroupOptions  {
  observationId: number;
  fieldGroupId: number;
  name: string;
  description: string;
};

export const updateObservationFieldGroup = ({ observationId, fieldGroupId, name, description }: UpdateObservationFieldGroupOptions): Promise<FieldGroup> => {
  return axios.post(`/observations/${observationId}/field_groups/${fieldGroupId}`, { name, description });
};

export interface DeleteObservationFieldGroupOptions  {
  fieldGroupId: number;
  observationId: number;
};

export const deleteObservationFieldGroup = ({ fieldGroupId, observationId }: DeleteObservationFieldGroupOptions) => {
  return axios.delete(`/observations/${observationId}/field_groups/${fieldGroupId}`);
};
