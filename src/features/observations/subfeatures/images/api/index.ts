import { axios } from "@/lib/axios";

import { Observation, Image } from "@/types";

type GetObservationImagesOptions = {
  observationId: string;
};

export const getObservationImages = ({ observationId }: GetObservationImagesOptions): Promise<Image[]> => {
  return axios.get(`/observations/${observationId}/images`);
};

type GetObservationImageOptions = {
  observationId: string;
  imageId: string;
};

export const getObservationImage = ({ observationId, imageId }: GetObservationImageOptions): Promise<Image> => {
  return axios.get(`/observations/${observationId}/images/${imageId}`);
};

type CreateObservationImageOptions = {
  observationId: string;
  name: string;
  description: string;
};

export const createObservationImage = ({ observationId, name, description }: CreateObservationImageOptions): Promise<Image> => {
  return axios.post(`/observations/${observationId}/images`, {
    name,
    description,
  });
};

type UpdateObservationImageOptions = {
  observationId: string;
  name: string;
  description: string;
};

export const updateObservationImage = ({ observationId, imageId, name, description }: UpdateObservationImageOptions): Promise<Image> => {
  return axios.post(`/observations/${observationId}/images/${imageId}`, {
    name,
    description,
  });
};

type DeleteObservationImageOptions = {
  imageId: string;
  observationId: string;
};

export const deleteObservationImage = ({ imageId, observationId }: DeleteObservationImageOptions) => {
  return axios.delete(`/observations/${observationId}/images/${imageId}`);
};
