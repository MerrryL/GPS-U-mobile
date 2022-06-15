import { axios } from "@/lib/axios";
import { Constatation, Image, ImageToSend } from "@/types";

interface GetConstatationImagesOptions {
  constatationId: number;
};

export const getConstatationImages = ({ constatationId }: GetConstatationImagesOptions): Promise<Image[]> => {
  return axios.get(`/constatations/${constatationId}/images`);
};

interface GetConstatationImageOptions {
  constatationId: number;
  imageId: string;
};

export const getConstatationImage = ({ constatationId, imageId }: GetConstatationImageOptions): Promise<Image> => {
  return axios.get(`/constatations/${constatationId}/images/${imageId}`);
};

interface CreateConstatationImageOptions {
  constatationId: number;
  name: string;
};

export const createConstatationImage = ({ constatationId, name }: CreateConstatationImageOptions): Promise<Image> => {
  console.log("here");
  return axios.post(`/constatations/${constatationId}/images`, { name });
};

interface DeleteConstatationImageOptions {
  imageId: number;
  constatationId: number;
};

export const deleteConstatationImage = ({ imageId, constatationId }: DeleteConstatationImageOptions) => {
  return axios.delete(`/constatations/${constatationId}/images/${imageId}`);
};

interface UploadConstatationOtherImageOptions {
  constatationId: number;
  image: ImageToSend;
};

export const uploadConstatationOtherImage = ({ image, constatationId }: UploadConstatationOtherImageOptions): Promise<Image | Constatation> => {
  return axios.post(`/constatations/${constatationId}/images/upload`, {
    image,
  });
};

interface UploadConstatationImageOptions {
  imageId?: number;
  constatationId: number;
  image: ImageToSend;
};

export const uploadConstatationImage = ({ image, constatationId, imageId }: UploadConstatationImageOptions): Promise<Image | Constatation> => {
  return axios.post(`/constatations/${constatationId}/images/${imageId}/upload`, { image });
};

interface DeletePictureConstatationImageOptions {
  imageId: number;
  constatationId: number;
};

export const deletePictureConstatationImage = ({ imageId, constatationId }: DeletePictureConstatationImageOptions): Promise<Constatation> => {
  return axios.delete(`/constatations/${constatationId}/images/${imageId}/remove`);
};

interface DefineAsThumbOptions {
  constatationId: number;
  imageId: number;
};

export const defineAsThumbConstatationImage = ({ constatationId, imageId }: DefineAsThumbOptions): Promise<Constatation> => {
  console.log("c", constatationId, imageId);
  return axios.get(`/constatations/${constatationId}/images/${imageId}/defineAsThumb`);
};
