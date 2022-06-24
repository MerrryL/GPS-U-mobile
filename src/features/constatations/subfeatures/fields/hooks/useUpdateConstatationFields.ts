import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { useNotificationStore } from '@/hooks/useNotificationStore';
import { Constatation } from '@/types';

export interface UpdateConstatationFieldsDTO {
    data: {
        title: string;
        body: string;
    };
    constatationId: number;
    fieldGroupId: number;
};

export const updateConstatationFields = ({
    data,
    constatationId,
    fieldGroupId
}: UpdateConstatationFieldsDTO): Promise<void> => {
    return axios.patch(`/constatations/${constatationId}/field_groups/${fieldGroupId}`, data);
};

interface UseUpdateConstatationFieldsOptions {
    config?: MutationConfig<typeof updateConstatationFields>;
};

export const useUpdateDiscussion = ({ config }: UseUpdateConstatationFieldsOptions = {}) => {
    const { addNotification } = useNotificationStore();

    return useMutation({
        onMutate: async (updatingConstatation: Constatation) => {
            await queryClient.cancelQueries(['constatation', updatingConstatation?.id]);

            const previousConstatation = queryClient.getQueryData<Constatation>([
                'constatations',
                updatingConstatation?.id,
            ]);

            // queryClient.setQueryData(['discussion', updatingConstatation?.id], {
            //     ...previousConstatation,
            //     ...updatingConstatation.field,
            //     id: updatingConstatation.id,
            // });

            return { previousConstatation };
        },
        onError: (_:any, __:any, context: any) => {
            if (context?.previousConstatation) {
                queryClient.setQueryData(
                    ['constatations', context.previousConstatation.id],
                    context.previousConstatation
                );
            }
        },
        onSuccess: (data:any) => {
            queryClient.refetchQueries(['constatation', data.id]);
            addNotification({
                type: 'success',
                title: 'Questionnaire mis-à-jour',
            });
        },
        ...config,
        mutationFn: updateConstatationFields,
    });
};