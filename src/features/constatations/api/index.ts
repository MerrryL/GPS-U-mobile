import { axios } from "@/lib/axios";
import { LocationActivityType } from "expo-location";

import { Constatation, Localization, ImageToSend, Image } from "../types";


//Constatations part
export const getConstatations = (): Promise<Constatation[]> => {
  return axios.get("constatations");
};

type GetConstatationOptions = {
  constatationId: string;
};

export const getConstatation = ({
  constatationId,
}: GetConstatationOptions): Promise<Constatation> => {
  return axios.get(`/constatations/${constatationId}`);
};

type ConstatationBody = {
  comment: string;
};

type CreateConstatationOptions = {
  //localization: Localization;
  data: ConstatationBody;
};

export const createConstatation = ({
  // localization,
  data,
}: CreateConstatationOptions): Promise<Constatation> => {
  return axios.post("constatations", { data });
};

type UpdateConstatationOptions = {
  constatationId: string;
  data: Constatation;
};

export const updateConstatation = ({
  data,
  constatationId,
}: UpdateConstatationOptions): Promise<Constatation> => {
  console.log("updating");
  return axios.patch(`constatations/${constatationId}`, data);
};

type DeleteConstatationOptions = {
  constatationId: string;
};

export const deleteConstatation = ({
  constatationId,
}: DeleteConstatationOptions) => {
  return axios.delete(`constatations/${constatationId}`);
};

export const importModels = (): Promise<Constatation[]> => {
  return axios.get("models");
};

export const importCopies = (): Promise<Constatation[]> => {
  return axios.get("copies");
};

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