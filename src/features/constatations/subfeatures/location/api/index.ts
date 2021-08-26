import { axios } from "@/lib/axios";
import { LocationActivityType } from "expo-location";

import { Localization } from "../types";

//LocalizationsPart

type GetLocalizationOptions = {
  constatationId?: string;
};

//TODO: this points to Index on the api instead of a "show"
export const getLocalization = ({
  constatationId = null,
}: GetLocalizationOptions): Promise<Localization[]> => {
  let filter = "";
  if (constatationId) {
    filter+="?filter[constatation_id]="+constatationId;
  }
  return axios.get('/localizations' + filter);
};

// type GetLocalizationOptions = {
//   localizationId: string;
// };

// export const getLocalization = ({
//   localizationId,
// }: GetLocalizationOptions): Promise<Localization> => {
//   return axios.get(`/localizations/${localizationId}`);
// };

type CreateLocalizationOptions = {
  constatationId: string;
  name: string;
};

export const createLocalization = ({
  constatationId,
  name,
}: CreateLocalizationOptions): Promise<Localization> => {
  return axios.post("/localizations/", { name, constatationId });
};

type DeleteLocalizationOptions = {
  localizationId: string;
  constatationId: string;
};

export const deleteLocalization = ({ localizationId, constatationId }: DeleteLocalizationOptions) => {
  return axios.delete(`localizations/${localizationId}`);
};