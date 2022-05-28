import { axios } from "@/lib/axios";
import { Codex, Observation, ObservationType } from "@/types";

//Observations part
export const getCodexes = (): Promise<Codex[]> => {
  return axios.get("/codexes");
};

//Observations part
export const getObservationTypes = (): Promise<ObservationType[]> => {
  return axios.get("/observation_types");
};


export const getObservations = (): Promise<Observation[]> => {
  return axios.get("/observations");
};

export interface GetObservationOptions {
  observationId: number;
};

export const getObservation = ({ observationId }: GetObservationOptions): Promise<Observation> => {
  return axios.get(`/observations/${observationId}`);
};

export interface ObservationBody {
  comment: string;
};

export const createObservation = (): Promise<Observation> => {
  return axios.post("observations");
};

export interface UpdateObservationOptions {
  observationId: number;
  data: Observation;
};

export const updateObservation = ({ data, observationId }: UpdateObservationOptions): Promise<Observation> => {
  return axios.patch(`observations/${observationId}`, data);
};

interface DeleteObservationOptions {
  observationId: number;
};

export const deleteObservation = ({ observationId }: DeleteObservationOptions) => {
  return axios.delete(`observations/${observationId}`);
};

