import { axios } from "@/lib/axios";
import { Observation } from "@/types";

//Observations part
export const getCodexes = (): Promise<Observation[]> => {
  return axios.get("/codexes");
};

export const getObservations = (): Promise<Observation[]> => {
  return axios.get("/observations");
};

type GetObservationOptions = {
  observationId: string;
};

export const getObservation = ({ observationId }: GetObservationOptions): Promise<Observation> => {
  return axios.get(`/observations/${observationId}`);
};

type ObservationBody = {
  comment: string;
};

export const createObservation = (): Promise<Observation> => {
  return axios.post("observations");
};

type UpdateObservationOptions = {
  observationId: string;
  data: Observation;
};

export const updateObservation = ({ data, observationId }: UpdateObservationOptions): Promise<Observation> => {
  return axios.patch(`observations/${observationId}`, data);
};

type DeleteObservationOptions = {
  observationId: string;
};

export const deleteObservation = ({ observationId }: DeleteObservationOptions) => {
  return axios.delete(`observations/${observationId}`);
};
