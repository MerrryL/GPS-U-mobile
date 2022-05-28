import { axios } from "@/lib/axios";
import { Localization } from "@/types";


type GetLocalizationOptions = {
  constatationId: number | number;
};

export const getLocalization = ({ constatationId }: GetLocalizationOptions): Promise<Localization> => {
  return axios.get(`/constatations/${constatationId}/localization`);
};

type UpdateLocalizationOptions = {
  localization: Localization;
  constatationId: number;
};

export const updateLocalization = ({ localization, constatationId }: UpdateLocalizationOptions): Promise<Localization> => {
  if (localization.id === undefined) {
    return axios.post(`/constatations/${constatationId}/localization/`, localization);
  } else {
    return axios.patch(`/constatations/${constatationId}/localization/${localization.id}`, localization);
  }
};
