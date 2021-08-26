import React from 'react';
import { FAB, Card, Text, Button, Input } from "react-native-elements";
import { FieldPart } from '../../fields/components/FieldPart';
import { FieldGroup } from '../types';

type FieldGroupCardProps= {
    fieldGroup: FieldGroup;
    constatationId: string;
}

export function FieldGroupCard({ fieldGroup, constatationId }: FieldGroupCardProps) {

    console.log("fieldGroup",fieldGroup);
    return (
        <>
            <Card>
                <Card.Title>{fieldGroup.name}</Card.Title>
                <Text>{fieldGroup.type}</Text>
                <Text>{fieldGroup.logical_operator}</Text>
                {fieldGroup?.fields?.map( (field) => <FieldPart field={field} constatationId={constatationId} fieldGroupId={fieldGroup.id}/>)}
            </Card>
        </>
    )
}