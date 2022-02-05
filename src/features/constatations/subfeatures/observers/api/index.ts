import { axios } from "@/lib/axios";

import { Observer } from "@/types";

export const getObservers = (): Promise<Observer[]> => {
  return axios.get("/observers");
};

type GetConstatationObserversOptions = {
  constatationId: string;
};

export const getConstatationObservers = ({
  constatationId,
}: GetConstatationObserversOptions): Promise<Observer[]> => {
  return axios.get(`/constatations/${constatationId}/observers`);
};

type ObserverToSend = {
  id: string;
};

type CreateObserverOptions = {
  constatationId: string;
  observers: ObserverToSend[];
};

export const updateConstatationObservers = ({
  constatationId,
  observers = [],
}: CreateObserverOptions): Promise<Observer[]> => {
  return axios.post(`constatations/${constatationId}/observers/`, {
    observers,
  });
};
