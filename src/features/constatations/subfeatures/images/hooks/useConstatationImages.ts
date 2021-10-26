import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getConstatationImages } from "../api";

type UseConstatationImagesOptions = {
  constatationId?: string;
  config?: QueryConfig<typeof getConstatationImages>;
};

export const useImages = ({ config, constatationId = null }: UseConstatationImagesOptions) => {
  return useQuery({
    ...config,
    queryKey: ["images"],
    queryFn: () => getConstatationImages({constatationId}),
  });
};
