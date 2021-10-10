import { useQuery } from "react-query";
import { QueryConfig } from "@/lib/react-query";
import { getLocalization } from "../api";

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
