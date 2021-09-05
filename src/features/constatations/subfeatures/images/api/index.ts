import { Constatation } from "@/features/constatations/types";
import { axios } from "@/lib/axios";
import { LocationActivityType } from "expo-location";

import { ImageToSend, Image } from "../types";

//ImagesPart

type GetImagesOptions = {
  constatationId?: string;
};

export const getImages = ({
  constatationId = null,
}: GetImagesOptions): Promise<Image[]> => {
  let filter = "";
  if (constatationId) {
    filter+="?filter[constatation_id]="+constatationId;
  }
  return axios.get('/images' + filter);
};

type GetImageOptions = {
  imageId: string;
};

export const getImage = ({
  imageId,
}: GetImageOptions): Promise<Image> => {
  return axios.get(`/images/${imageId}`);
};

type CreateImageOptions = {
  constatationId: string;
  name: string;
};

export const createImage = ({
  constatationId,
  name,
}: CreateImageOptions): Promise<Image> => {
  return axios.post("/images/", { name, constatationId });
};

type DeleteImageOptions = {
  imageId: string;
  constatationId: string;
};

export const deleteImage = ({ imageId, constatationId }: DeleteImageOptions) => {
  return axios.delete(`images/${imageId}`);
};


type UploadImageOptions = {
  imageId: string;
  image: ImageToSend;
};

export const uploadImage = ({
  image,
  imageId,
}: UploadImageOptions): Promise<Image> => {
  return axios.post(`/images/upload/${imageId}`, { image });
};

type DefineAThumbOptions = {
  imageId: string;
  constatationId: string;
};

export const defineAThumb = ({
  constatationId,
  imageId
}: DefineAThumbOptions): Promise<Constatation> => {
  return axios.post(`/constatations/${constatationId}/defineAThumb`, {imageId: imageId})
}