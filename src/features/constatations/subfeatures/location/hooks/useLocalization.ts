import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getLocalization } from "../api";

import { Localization } from "../types";
import { Callback } from "yup/lib/types";

type UseLocalizationOptions = {
  constatationId?: string;
  config?: QueryConfig<typeof getLocalization>;
};

export const useLocalization = ({
  constatationId,
  config,
}: UseLocalizationOptions) => {
  return useQuery({
    ...config,
    queryKey: ["localizations", constatationId],
    queryFn: () => getLocalization({ constatationId }),
  });
};
