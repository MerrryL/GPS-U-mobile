import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getObservationImageRequest } from "../api";



type UseObservationImageOptions = {
  imageRequestId: number;
  observationId: number;
  config?: QueryConfig<typeof getObservationImageRequest>;
};

export const useObservationImage = ({ imageRequestId, observationId, config }: UseObservationImageOptions) => {
  return useQuery({
    queryKey: [  "observations",observationId, "image_requests", imageRequestId],
    queryFn: () => getObservationImageRequest({ observationId: observationId, imageRequestId: imageRequestId }),
    ...config,
  });
};
