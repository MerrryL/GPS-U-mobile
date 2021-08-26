import React from 'react';
import { FAB, Card, Text, Button, Input } from "react-native-elements";
import { View } from 'react-native';
import { FieldPart } from '../../fields/components/FieldPart';
import { FieldGroup } from '../types';
import { useFieldGroup } from '../hooks/useFieldGroup';
import { FieldsAdd } from '../../fields/components/FieldAdd';

type FieldGroupCardProps= {
    fieldGroup: FieldGroup;
    constatationId: string;
}

export function FieldGroupCard({ fieldGroup, constatationId }: FieldGroupCardProps) {
    const FieldGroupQuery = useFieldGroup({
       fieldGroupId: fieldGroup.id,
      });

    console.log("id", fieldGroup.id,"fieldGroup",FieldGroupQuery?.data);
    return (
        <View style={{margin: 10}}>
            <Card>
                <Card.Title>Groupe: {fieldGroup.name}</Card.Title>
                <Text>{fieldGroup.type}</Text>
                <Text>{fieldGroup.logical_operator}</Text>
                <FieldsAdd constatationId={constatationId} fieldGroupId={fieldGroup.id}/>
                {FieldGroupQuery?.data?.fields?.map( (field) => <FieldPart field={field} constatationId={constatationId} fieldGroupId={fieldGroup.id} key={field.id}/>)}
            </Card>
        </View>
    )
}