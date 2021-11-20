import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getFollowups } from "../api";

type UseFollowupsOptions = {
  config?: QueryConfig<typeof getFollowups>;
};

export const useFollowups = ({ config }: UseFollowupsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["followups"],
    queryFn: () => getFollowups(),
  });
};
