import { QueryKeys } from "@/lib/query-keys";
import { queryClient, QueryConfig } from "@/lib/react-query";
import { Constatation } from "@/types";
import { axios } from "@/lib/axios";
import { useQuery, UseQueryResult } from "react-query";


interface GetConstatationOptions {
  constatationId: number;
};

export const getConstatation: ({ constatationId }: GetConstatationOptions) => Promise<Constatation> = ({ constatationId }: GetConstatationOptions): Promise<Constatation> => {
  return axios.get(`/constatations/${constatationId}`);
};
interface UseConstatationOptions {
  constatationId: number;
  config?: QueryConfig<typeof getConstatation>;
};

export const useConstatation = ({ config, constatationId }: UseConstatationOptions): UseQueryResult<Constatation> => {
  return useQuery<Constatation>({
    initialData: (): Constatation | undefined => queryClient.getQueryData<Constatation[]>(QueryKeys.Constatations)?.find((constatation: Constatation) => constatation.id === constatationId),
    queryKey: [QueryKeys.Constatations, constatationId],
    queryFn: (): Promise<Constatation> => getConstatation({ constatationId }),
    ...config,
  });
};
