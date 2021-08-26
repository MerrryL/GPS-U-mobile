import React from 'react';
import { FAB, Card, Text, Button, Input } from "react-native-elements";
import { Field } from '../types';

type FieldCardProps= {
    field: Field;
    constatationId: string;
}

export function FieldCard({ field, constatationId }: FieldCardProps) {

    console.log("fieldGroup",field);
    return (
        <>
            <Card>
                <Card.Title>{field.name}</Card.Title>
                <Text>{field.type}</Text>
                
                
            </Card>
        </>
    )
}