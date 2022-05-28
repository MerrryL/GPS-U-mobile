import { QueryConfig } from "@/lib/react-query";
import { Constatation } from "@/types";
import { useQuery } from "react-query";
import { getConstatation } from "../api";

type UseConstatationOptions = {
  constatationId: number;
  config?: QueryConfig<typeof getConstatation>;
};

export const useConstatation = ({ constatationId, config }: UseConstatationOptions) => {
  return useQuery<Constatation>({
    ...config,
    queryKey: ["constatations", constatationId],
    queryFn: () => getConstatation({ constatationId }),
  });
};
