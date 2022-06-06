import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getObservationImageRequests } from "../api";



type UseObservationImagesOptions = {
  observationId: number;
  config?: QueryConfig<typeof getObservationImageRequests>;
};

export const useObservationImageRequests = ({ config, observationId}: UseObservationImagesOptions) => {
  return useQuery({
    queryKey: ["observations",observationId, "image_requests"],
    queryFn: () => getObservationImageRequests({ observationId }),
    ...config,
  });
};
