import { useQuery } from "react-query";

import { QueryConfig } from "@/lib/react-query";

import { getCodexes } from "../api";

type UseCodexesOptions = {
  config?: QueryConfig<typeof getCodexes>;
};

export const useCodexes = ({ config }: UseCodexesOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["codexes"],
    queryFn: () => getCodexes(),
  });
};
