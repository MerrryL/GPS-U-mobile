import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getFollowupStatuses } from "../api";

type UseFollowupStatusesOptions = {
  config?: QueryConfig<typeof getFollowupStatuses>;
};

export const useFollowupStatuses = ({
  config,
}: UseFollowupStatusesOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["followup_statuses"],
    queryFn: () => getFollowupStatuses(),
  });
};
