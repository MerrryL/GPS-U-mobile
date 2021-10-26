import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getConstatationImage } from "../api";

type UseConstatationImageOptions = {
  imageId: string;
  constatationId: string;
  config?: QueryConfig<typeof getConstatationImage>;
};

export const useConstatationImage = ({
  imageId,
  constatationId,
  config,
}: UseConstatationImageOptions) => {
  return useQuery({
    ...config,
    queryKey: ["images", imageId],
    queryFn: () => getConstatationImage({ constatationId: constatationId, imageId: imageId }),
  });
};
