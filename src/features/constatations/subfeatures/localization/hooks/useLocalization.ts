import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getLocalization } from "../api";

type UseLocalizationOptions = {
  constatationId: number | number;
  config?: QueryConfig<typeof getLocalization>;
};

export const useLocalization = ({ constatationId, config }: UseLocalizationOptions) => {
  return useQuery({
    ...config,
    queryKey: ["localizations", constatationId],
    queryFn: () => getLocalization({ constatationId }),
  });
};
