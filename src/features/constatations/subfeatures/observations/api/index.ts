import { axios } from "@/lib/axios";

import { Observation } from "@/types";

export const getObservations = (): Promise<Observation[]> => {
  return axios.get("/observations");
};

type GetConstatationObservationsOptions = {
  constatationId: string;
};

export const getConstatationObservations = ({
  constatationId,
}: GetConstatationObservationsOptions): Promise<Observation[]> => {
  return axios.get(`/constatations/${constatationId}/observations`);
};

type ObservationToSend = {
  id: string;
};

type CreateObservationOptions = {
  constatationId: string;
  Observations: ObservationToSend[];
};

export const updateConstatationObservations = ({
  constatationId,
  Observations = [],
}: CreateObservationOptions): Promise<Observation[]> => {
  return axios.post(`constatations/${constatationId}/observations/`, {
    Observations,
  });
};
