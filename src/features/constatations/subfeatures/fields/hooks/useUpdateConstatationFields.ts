import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/hooks/useNotificationStore';
import { QueryKeys } from '@/lib/query-keys';

export interface UpdateConstatationFieldsDTO {
    data: any[];
    constatationId: number;
};

export const updateConstatationFields = ({
    data,
    constatationId,
}: UpdateConstatationFieldsDTO): Promise<void>[] => {
    return data.map(value => axios.patch(`/constatations/${constatationId}/fields/${value[0]}`, {field: value[0], data:value[1]}));
};

interface UseUpdateConstatationFieldsOptions {
    config?: MutationConfig<typeof updateConstatationFields>;
};

export const useUpdateConstatationFields = ({ config }: UseUpdateConstatationFieldsOptions = {}) => {
    const { addNotification } = useNotificationStore();

    return useMutation({
        // onMutate: async ({data, constatationId, fieldGroupId}:UpdateConstatationFieldsDTO) => {
        //     await queryClient.cancelQueries([QueryKeys.Constatations]);
        //     await queryClient.cancelQueries([QueryKeys.Constatations, constatationId]);

        //     const previousConstatation: Constatation | undefined = queryClient.getQueryData<Constatation>([QueryKeys.Constatations, constatationId]);
        //     queryClient.setQueryData([QueryKeys.Constatations, constatationId], {
        //         ...previousConstatation,
        //         field: localization,
        //     });

        //     await queryClient.cancelQueries([QueryKeys.Constatations]);

        //     const previousConstatations: Constatation[] | undefined = queryClient.getQueryData<Constatation[]>([QueryKeys.Constatations]);
        //     queryClient.setQueryData([QueryKeys.Constatations], [...(previousConstatations?.filter((constatation: Constatation) => constatation.id !== constatationId) || []), {
        //         ...previousConstatation,
        //         localization: localization,
        //     }]);

        //     return { previousConstatation: previousConstatation, previousConstatations: previousConstatations };
        // },
        // onError: (_:any, __:any, context: any) => {
        //     if (context?.previousConstatation) {
        //         queryClient.setQueryData(
        //             ['constatations', context.previousConstatation.id],
        //             context.previousConstatation
        //         );
        //     }
        // },
        onSuccess: (data:any) => {
            queryClient.invalidateQueries([QueryKeys.Constatations]);
            // queryClient.invalidateQueries([QueryKeys.Constatations, constatation_id]);
            addNotification({
                type: 'success',
                title: 'Questionnaire mis-à-jour',
            });
        },
        mutationFn: updateConstatationFields,
    });
};