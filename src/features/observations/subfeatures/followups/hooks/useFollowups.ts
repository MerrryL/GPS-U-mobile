import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getFollowups } from "../api";

type UseFollowupsOptions = {
  observationId: string;
  config?: QueryConfig<typeof getFollowups>;
};

export const useFollowups = ({ config, observationId }: UseFollowupsOptions) => {
  return useQuery({
    ...config,
    queryKey: ["followups"],
    queryFn: () => getFollowups({observationId}),
  });
};
