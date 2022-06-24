import { AxiosError } from "axios";
import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions } from "react-query";
import { PromiseValue } from "type-fest";

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
    suspense: true,
  },
};

export const queryClient:QueryClient = new QueryClient({ defaultOptions: queryConfig });

// export type QueryConfig<FetcherFnType extends (...args: any) => any> = UseQueryOptions<PromiseValue<ReturnType<FetcherFnType>>>;

// export type MutationConfig<FetcherFnType extends (...args: any) => any> = UseMutationOptions<PromiseValue<ReturnType<FetcherFnType>>, AxiosError, Parameters<FetcherFnType>[0]>;


export type ExtractFnReturnType<FnType extends (...args: any) => any> = PromiseValue<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;