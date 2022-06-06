import { axios } from "@/lib/axios";
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
  constatationId: number;
};

export const getConstatationImages = ({ constatationId }: GetConstatationImagesOptions): Promise<Image[]> => {
  return axios.get(`/constatations/${constatationId}/images`);
};

type GetConstatationImageOptions = {
  constatationId: number;
  imageId: string;
};

export const getConstatationImage = ({ constatationId, imageId }: GetConstatationImageOptions): Promise<Image> => {
  return axios.get(`/constatations/${constatationId}/images/${imageId}`);
};

type CreateConstatationImageOptions = {
  constatationId: number;
  name: string;
};

export const createConstatationImage = ({ constatationId, name }: CreateConstatationImageOptions): Promise<Image> => {
  console.log("here");
  return axios.post(`/constatations/${constatationId}/images`, { name });
};

type DeleteConstatationImageOptions = {
  imageId: string;
  constatationId: number;
};

export const deleteConstatationImage = ({ imageId, constatationId }: DeleteConstatationImageOptions) => {
  return axios.delete(`/constatations/${constatationId}/images/${imageId}`);
};

type UploadConstatationOtherImageOptions = {
  constatationId: number;
  image: ImageToSend;
};

export const uploadConstatationOtherImage = ({ image, constatationId }: UploadConstatationOtherImageOptions): Promise<Image | Constatation> => {
  return axios.post(`/constatations/${constatationId}/images/upload`, {
    image,
  });
};

type UploadConstatationImageOptions = {
  imageId?: string;
  constatationId: number;
  image: ImageToSend;
};

export const uploadConstatationImage = ({ image, constatationId, imageId }: UploadConstatationImageOptions): Promise<Image | Constatation> => {
  return axios.post(`/constatations/${constatationId}/images/${imageId}/upload`, { image });
};

type DeletePictureConstatationImageOptions = {
  imageId: number;
  constatationId: number;
};

export const deletePictureConstatationImage = ({ imageId, constatationId }: DeletePictureConstatationImageOptions): Promise<Constatation> => {
  return axios.delete(`/constatations/${constatationId}/images/${imageId}/remove`);
};

type DefineAsThumbOptions = {
  constatationId: number;
  imageId: number;
};

export const defineAsThumbConstatationImage = ({ constatationId, imageId }: DefineAsThumbOptions): Promise<Constatation> => {
  console.log("c", constatationId, imageId);
  return axios.get(`/constatations/${constatationId}/images/${imageId}/defineAsThumb`);
};
