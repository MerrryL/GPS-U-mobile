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