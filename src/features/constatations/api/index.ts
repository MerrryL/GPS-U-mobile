import { axios } from "@/lib/axios";
import { LocationActivityType } from "expo-location";

import { Constatation, Location, ImageToSend, Image } from "../types";

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
  title: string;
  body: string;
};

type CreateConstatationOptions = {
  location: Location;
  data: ConstatationBody;
};

export const createConstatation = ({
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

type UploadImageOptions = {
  imageId: string;
  data: ImageToSend;
};

export const uploadImage = ({
  data,
  imageId,
}: UploadImageOptions): Promise<Image> => {
  return axios.post(`constatations/${imageId}`, { data });
};
