import { axios } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { FieldType } from "@/types";
import { useQuery } from "react-query";



export const getFieldTypes = (): Promise<FieldType[]> => {
  return axios.get("field_types");
};

type UseFieldTypesOptions = {
  config?: QueryConfig<typeof getFieldTypes>;
};

export const useFieldTypes = ({ config }: UseFieldTypesOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["field_types"],
    queryFn: () => getFieldTypes(),
  });
};
