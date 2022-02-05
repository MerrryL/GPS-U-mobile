import { axios } from "@/lib/axios";

import { Localization } from "@/types";

type GetLocalizationOptions = {
  constatationId: string | number;
};

export const getLocalization = ({
  constatationId,
}: GetLocalizationOptions): Promise<Localization> => {
  return axios.get(`/constatations/${constatationId}/localization`);
};

type UpdateLocalizationOptions = {
  localization: Localization;
  constatationId: string;
};

export const updateLocalization = ({
  localization,
  constatationId,
}: UpdateLocalizationOptions): Promise<Localization> => {
  if (localization.id === undefined) {
    return axios.post(
      `/constatations/${constatationId}/localization/`,
      localization
    );
  } else {
    return axios.patch(
      `/constatations/${constatationId}/localization/${localization.id}`,
      localization
    );
  }
};
