import { axios } from "@/lib/axios";
import { LocationActivityType } from "expo-location";

import { Constatation, Image } from "@/types";

type ImageToSend = {
  name: string;
  height: number;
  width: number;
  type: string;
  uri: string;
  base64: string;
};

type GetConstatationImagesOptions = {
  constatationId: string;
};

export const getConstatationImages = ({ constatationId }: GetConstatationImagesOptions): Promise<Image[]> => {
  return axios.get(`/constatations/${constatationId}/images`);
};

type GetConstatationImageOptions = {
  constatationId: string;
  imageId: string;
};

export const getConstatationImage = ({ constatationId, imageId }: GetConstatationImageOptions): Promise<Image> => {
  return axios.get(`/constatations/${constatationId}/images/${imageId}`);
};

type CreateConstatationImageOptions = {
  constatationId: string;
  name: string;
};

export const createConstatationImage = ({ constatationId, name }: CreateConstatationImageOptions): Promise<Image> => {
  console.log("here");
  return axios.post(`/constatations/${constatationId}/images`, { name });
};

type DeleteConstatationImageOptions = {
  imageId: string;
  constatationId: string;
};

export const deleteConstatationImage = ({ imageId, constatationId }: DeleteConstatationImageOptions) => {
  return axios.delete(`/constatations/${constatationId}/images/${imageId}`);
};

type UploadConstatationOtherImageOptions = {
  constatationId: string;
  image: ImageToSend;
};

export const uploadConstatationOtherImage = ({ image, constatationId }: UploadConstatationOtherImageOptions): Promise<Image | Constatation> => {
  return axios.post(`/constatations/${constatationId}/images/upload`, {
    image,
  });
};

type UploadConstatationImageOptions = {
  imageId?: string;
  constatationId: string;
  image: ImageToSend;
};

export const uploadConstatationImage = ({ image, constatationId, imageId }: UploadConstatationImageOptions): Promise<Image | Constatation> => {
  return axios.post(`/constatations/${constatationId}/images/${imageId}/upload`, { image });
};

type DeletePictureConstatationImageOptions = {
  imageId: string;
  constatationId: string;
};

export const deletePictureConstatationImage = ({ imageId, constatationId }: DeletePictureConstatationImageOptions): Promise<Constatation> => {
  return axios.delete(`/constatations/${constatationId}/images/${imageId}/remove`);
};

type DefineAsThumbOptions = {
  constatationId: string;
  imageId: string;
};

export const defineAsThumbConstatationImage = ({ constatationId, imageId }: DefineAsThumbOptions): Promise<Constatation> => {
  console.log("c", constatationId, imageId);
  return axios.get(`/constatations/${constatationId}/images/${imageId}/defineAsThumb`);
};
