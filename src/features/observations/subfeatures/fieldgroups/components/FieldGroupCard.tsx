import React from 'react';
import { FAB, Card, Text, Button, Input } from "react-native-elements";
import { View } from 'react-native';
import { FieldGroup } from '@/types';
import { useObservationFieldGroup } from '../hooks/useObservationFieldGroup';
import { FieldsAdd } from '../subfeatures/fields/components/FieldAdd';
import { FieldCard } from '../subfeatures/fields/components/FieldCard';
import { useDeleteObservationFieldGroup } from '../hooks/useDeleteObservationFieldGroups';
import { useFields } from '../subfeatures/fields/hooks/useFields';

type ObservationFieldGroupCardProps= {
    fieldGroupId: string;
    observationId: string;
}

export function FieldGroupCard({ fieldGroupId, observationId }: ObservationFieldGroupCardProps) {
    const ObservationFieldGroupQuery = useObservationFieldGroup({
       fieldGroupId: fieldGroupId,
       observationId: observationId
    });
    const fieldGroup=ObservationFieldGroupQuery?.data;

    const fieldGroupDeleteMutation = useDeleteObservationFieldGroup({observationId: observationId, fieldGroupId: fieldGroup.id});

    const onDeleteSubmit = async () => {
        await fieldGroupDeleteMutation.mutateAsync({
            observationId: observationId,
            fieldGroupId: fieldGroupId,
        });
    };

    return (
        <View style={{margin: 10}}>
            <Card>
                <Button title="Supprimer le groupe" onPress={onDeleteSubmit} />
                <Card.Title>Groupe: {fieldGroup?.name}</Card.Title>
                <Text>Type: {fieldGroup?.type}</Text>
                <Text>Opérateur logique: {fieldGroup?.logical_operator}</Text>
                <FieldsAdd observationId={observationId} fieldGroupId={fieldGroup?.id}/>
                {fieldGroup?.fields?.map( (field) => <FieldCard fieldId={field?.id} observationId={observationId} fieldGroupId={field?.field_group_id} key={field?.id}/>)}
            </Card>
        </View>
    )
}