import { QueryKeys } from "@/lib/query-keys";
import { QueryConfig } from "@/lib/react-query";
import { Constatation } from "@/types";
import { axios } from "@/lib/axios";
import { useQuery, UseQueryResult } from "react-query";


export const getConstatations: () => Promise<Constatation[]> = (): Promise<Constatation[]> => {
  return axios.get("constatations");
};

interface UseConstatationsOptions {
  config?: QueryConfig<typeof getConstatations>;
};

export const useConstatations = ({ config }: UseConstatationsOptions = {}): UseQueryResult<Constatation[]> => {
  return useQuery<Constatation[], Error>({
    queryKey: [QueryKeys.Constatations],
    queryFn: (): Promise<Constatation[]> => getConstatations(),
  });
};
