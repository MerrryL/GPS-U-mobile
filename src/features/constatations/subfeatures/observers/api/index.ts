import { axios } from "@/lib/axios";

import { Observer } from "@/types";

//ObserversPart

type GetObserversOptions = {
  constatationId?: string;
};

// //TODO: this points to Index on the api instead of a "show"
// export const getObservers = ({
//   constatationId = null,
// }: GetObserversOptions): Promise<Observer[]> => {
//   let filter = "";
//   if (constatationId) {
//     filter+="?filter[constatation_id]="+constatationId;
//   }
//   return axios.get('/users' + filter);
// };


export const getObservers = (): Promise<Observer[]> => {
  return axios.get('/observers');
};

type GetObserverOptions = {
  userId: string;
};

export const getObserver = ({
  userId,
}: GetObserverOptions): Promise<Observer> => {
  return axios.get(`/users/${userId}`);
};

type ObserverToSend = {
  id: string;
}

type CreateObserverOptions = {
  constatationId: string;
  observers: ObserverToSend[];
};

export const updateObserver = ({
  constatationId,
  observers = [],
}: CreateObserverOptions): Promise<Observer[]> => {
  return axios.post(`constatations/${constatationId}/observers/`, { observers });
};

type DeleteObserverOptions = {
  userId: string;
  constatationId: string;
};

export const deleteObserver = ({ userId, constatationId }: DeleteObserverOptions) => {
  return axios.delete(`users/${userId}`);
};