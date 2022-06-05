import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getObservationImageRequests } from "../api";



type UseObservationImagesOptions = {
  observationId: number;
  config?: QueryConfig<typeof getObservationImageRequests>;
};

export const useImages = ({ config, observationId}: UseObservationImagesOptions) => {
  return useQuery({
    queryKey: ["images"],
    queryFn: () => getObservationImageRequests({ observationId }),
    ...config,
  });
};
