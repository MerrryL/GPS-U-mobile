import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getObservationImages } from "../api";

type UseObservationImagesOptions = {
  observationId?: string;
  config?: QueryConfig<typeof getObservationImages>;
};

export const useImages = ({
  config,
  observationId = null,
}: UseObservationImagesOptions) => {
  return useQuery({
    ...config,
    queryKey: ["images"],
    queryFn: () => getObservationImages({ observationId }),
  });
};
