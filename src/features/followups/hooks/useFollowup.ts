import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getFollowup } from "../api";

type UseFollowupOptions = {
  constatationId: string;
  config?: QueryConfig<typeof getFollowup>;
};

export const useFollowup = ({
  constatationId,
  config,
}: UseFollowupOptions) => {
  return useQuery({
    ...config,
    queryKey: ["constatations", constatationId],
    queryFn: () => getFollowup({ constatationId }),
  });
};
