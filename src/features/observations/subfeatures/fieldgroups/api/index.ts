import { axios } from "@/lib/axios";

import { Observation, FieldGroup } from "@/types";

type GetObservationFieldGroupsOptions = {
  observationId: string;
};

export const getObservationFieldGroups = ({ observationId }: GetObservationFieldGroupsOptions): Promise<FieldGroup[]> => {
  return axios.get(`/observations/${observationId}/field_groups`);
};

type GetObservationFieldGroupOptions = {
  observationId: string;
  fieldGroupId: string;
};

export const getObservationFieldGroup = ({ observationId, fieldGroupId }: GetObservationFieldGroupOptions): Promise<FieldGroup> => {
  return axios.get(`/observations/${observationId}/field_groups/${fieldGroupId}`);
};

type CreateObservationFieldGroupOptions = {
  observationId: string;
  name: string;
  logical_operator: string;
  type: string;
};

export const createObservationFieldGroup = ({ observationId, name, type, logical_operator }: CreateObservationFieldGroupOptions): Promise<FieldGroup> => {
  return axios.post(`/observations/${observationId}/field_groups`, {
    name,
    type,
    logical_operator,
  });
};

type UpdateObservationFieldGroupOptions = {
  observationId: string;
  name: string;
  type: string;
};

export const updateObservationFieldGroup = ({ observationId, fieldGroupId, name, type, logical_operator }: UpdateObservationFieldGroupOptions): Promise<FieldGroup> => {
  return axios.post(`/observations/${observationId}/field_groups/${fieldGroupId}`, { name, type, logical_operator });
};

type DeleteObservationFieldGroupOptions = {
  fieldGroupId: string;
  observationId: string;
};

export const deleteObservationFieldGroup = ({ fieldGroupId, observationId }: DeleteObservationFieldGroupOptions) => {
  return axios.delete(`/observations/${observationId}/field_groups/${fieldGroupId}`);
};
