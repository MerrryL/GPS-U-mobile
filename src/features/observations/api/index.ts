import { axios } from "@/lib/axios";
import { LocationActivityType } from "expo-location";

import { Observation } from "@/types";


//Observations part
export const getObservations = (): Promise<Observation[]> => {
  return axios.get("constatations");
};

type GetObservationOptions = {
  constatationId: string;
};

export const getObservation = ({
  constatationId,
}: GetObservationOptions): Promise<Observation> => {
  return axios.get(`/constatations/${constatationId}`);
};

type ObservationBody = {
  comment: string;
};

type CreateObservationOptions = {
  //localization: Localization;
  data: ObservationBody;
};

export const createObservation = ({
  // localization,
  data,
}: CreateObservationOptions): Promise<Observation> => {
  return axios.post("constatations", { data });
};

type UpdateObservationOptions = {
  constatationId: string;
  data: Observation;
};

export const updateObservation = ({
  data,
  constatationId,
}: UpdateObservationOptions): Promise<Observation> => {
  return axios.patch(`constatations/${constatationId}`, data);
};

type RequireValidationOptions = {
  constatationId: string;
}

export const requireValidation = ({
  constatationId,
}: RequireValidationOptions): Promise<Observation> => {
  return axios.post(`constatations/require_validation/${constatationId}`);
};

type UnRequireValidationOptions = {
  constatationId: string;
}

export const unRequireValidation = ({
  constatationId,
}: UnRequireValidationOptions): Promise<Observation> => {
  return axios.post(`constatations/unrequire_validation/${constatationId}`);
};

type ValidateObservationOptions = {
  constatationId: string;
}

export const validateObservation = ({
  constatationId,
}: ValidateObservationOptions): Promise<Observation> => {
  return axios.post(`constatations/validate_constatation/${constatationId}`);
};

type DeleteObservationOptions = {
  constatationId: string;
};

export const deleteObservation = ({
  constatationId,
}: DeleteObservationOptions) => {
  return axios.delete(`constatations/${constatationId}`);
};

export const importModels = (): Promise<Observation[]> => {
  return axios.get("models");
};

export const importCopies = (): Promise<Observation[]> => {
  return axios.get("copies");
};