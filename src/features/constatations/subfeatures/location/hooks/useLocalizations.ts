// import { useQuery } from "react-query";

// import { QueryConfig } from "@/lib/react-query";

// import { getLocalizations } from "../api";

// type UseLocalizationsOptions = {
//   constatationId?: string;
//   config?: QueryConfig<typeof getLocalizations>;
// };

// export const useLocalizations = ({ config, constatationId = null }: UseLocalizationsOptions) => {
//   return useQuery({
//     ...config,
//     queryKey: ["localizations"],
//     queryFn: () => getLocalizations({constatationId}),
//   });
// };
