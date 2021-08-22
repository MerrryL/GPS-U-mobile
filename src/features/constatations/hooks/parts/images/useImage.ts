import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getImage } from "../../../api";

import { Image } from "../../../types";

type UseImageOptions = {
  imageId: string;
  config?: QueryConfig<typeof getImage>;
};

export const useImage = ({
  imageId,
  config,
}: UseImageOptions) => {
  return useQuery({
    ...config,
    queryKey: ["images", imageId],
    queryFn: () => getImage({ imageId }),
  });
};
