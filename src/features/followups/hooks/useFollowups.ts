import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getFollowups } from "../api";

type UseFollowupsOptions = {
  constatationId?: string;
  config?: QueryConfig<typeof getFollowups>;
};

export const useFollowups = ({ config, constatationId = null }: UseFollowupsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["followups"],
    queryFn: () => getFollowups({constatationId}),
  });
};
