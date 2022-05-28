import { QueryConfig } from "@/lib/react-query";
import { Constatation } from "@/types";
import { useQuery } from "react-query";
import { getConstatations } from "../api";



type UseConstatationsOptions = {
  config?: QueryConfig<typeof getConstatations>;
};

export const useConstatations = ({ config }: UseConstatationsOptions = {}) => {
  return useQuery<Constatation[], Error>({
    // ...config,
    queryKey: ["constatations"],
    queryFn: () => getConstatations(),
  });
};
