import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getFollowup } from "../api";

type UseFollowupOptions = {
  followupId: string;
  config?: QueryConfig<typeof getFollowup>;
};

export const useFollowup = ({ followupId, config }: UseFollowupOptions) => {
  return useQuery({
    ...config,
    queryKey: ["followups", followupId],
    queryFn: () => getFollowup({ followupId }),
  });
};
