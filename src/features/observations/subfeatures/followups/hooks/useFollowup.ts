import { useQuery } from "react-query";
import { QueryConfig } from "@/lib/react-query";
import { getFollowup } from "../api";

type UseFollowupOptions = {
  observationId: string;
  followupId: string;
  config?: QueryConfig<typeof getFollowup>;
};

export const useFollowup = ({ observationId, followupId, config }: UseFollowupOptions) => {
  return useQuery({
    ...config,
    queryKey: ["followups", followupId],
    queryFn: () => getFollowup({ observationId, followupId }),
  });
};
