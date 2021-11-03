import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getObservationImage } from "../api";

type UseObservationImageOptions = {
  imageId: string;
  observationId: string;
  config?: QueryConfig<typeof getObservationImage>;
};

export const useObservationImage = ({
  imageId,
  observationId,
  config,
}: UseObservationImageOptions) => {
  return useQuery({
    ...config,
    queryKey: ["images", imageId],
    queryFn: () => getObservationImage({ observationId: observationId, imageId: imageId }),
  });
};
