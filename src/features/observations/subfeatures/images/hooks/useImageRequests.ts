import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";
import { getImageRequests } from "../api";



interface UseImageRequestOptions {
  config?: QueryConfig<typeof getImageRequests>;
};

export const useImageRequests = ({ config}: UseImageRequestOptions = {}) => {
  return useQuery({
    queryKey: ["image_requests"],
    queryFn: () => getImageRequests(),
    ...config,
  });
};
