import { axios } from "@/lib/axios";
import { Localization } from "@/types";


type GetLocalizationOptions = {
  constatationId: number | number;
};

export const getLocalization = ({ constatationId }: GetLocalizationOptions): Promise<Localization> => {
  return axios.get(`/constatations/${constatationId}/localization`);
};

