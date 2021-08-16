import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getConstatation } from "../api";

type UseConstatationOptions = {
  constatationId: string;
  config?: QueryConfig<typeof getConstatation>;
};

export const useConstatation = ({
  constatationId,
  config,
}: UseConstatationOptions) => {
  return useQuery({
    ...config,
    queryKey: ["constatation", constatationId],
    queryFn: () => getConstatation({ constatationId }),
  });
};
