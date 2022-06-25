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
  return axios.post(`/constatations/${constatationId}/images`, { name });
};
