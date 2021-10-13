import { axios } from "@/lib/axios";

import { User } from "@/types";

//UsersPart

type GetUsersOptions = {
  constatationId?: string;
};

//TODO: this points to Index on the api instead of a "show"
export const getUsers = ({
  constatationId = null,
}: GetUsersOptions): Promise<User[]> => {
  let filter = "";
  if (constatationId) {
    filter+="?filter[constatation_id]="+constatationId;
  }
  return axios.get('/users' + filter);
};


export const getObservers = (): Promise<User[]> => {
  return axios.get('/observers');
};

type GetUserOptions = {
  userId: string;
};

export const getUser = ({
  userId,
}: GetUserOptions): Promise<User> => {
  return axios.get(`/users/${userId}`);
};

type ObserverToSend = {
  id: string;
}

type CreateUserOptions = {
  constatationId: string;
  observers: ObserverToSend[];
};

export const updateObserver = ({
  constatationId,
  observers = [],
}: CreateUserOptions): Promise<User> => {
  return axios.post(`constatations/${constatationId}/observers/`, { observers });
};

type DeleteUserOptions = {
  userId: string;
  constatationId: string;
};

export const deleteUser = ({ userId, constatationId }: DeleteUserOptions) => {
  return axios.delete(`users/${userId}`);
};