import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getImages } from "../../../api";

type UseImagesOptions = {
  constatationId?: string;
  config?: QueryConfig<typeof getImages>;
};

export const useImages = ({ config, constatationId = null }: UseImagesOptions) => {
  return useQuery({
    ...config,
    queryKey: ["images"],
    queryFn: () => getImages({constatationId}),
  });
};
