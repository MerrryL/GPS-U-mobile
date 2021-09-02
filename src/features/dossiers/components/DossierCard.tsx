import React from 'react';
import { FAB, Card, Text, Button, Input } from "react-native-elements";
import { View } from 'react-native';
import { useDeleteDossier } from '../hooks/useDeleteDossier';
import { Dossier } from '../types';
import { useDossier } from '../hooks/useDossier';

type DossierCardProps = {
    dossier: Dossier;
}

export function DossierCard({ dossier }: DossierCardProps) {
    const dossierQuery = useDossier({ dossierId: dossier.id });
    const dossierDeleteMutation = useDeleteDossier({ dossierId:dossier.id});

    const onDeleteSubmit = async () => {
        //todo: pause
        await dossierDeleteMutation.mutateAsync({
            dossierId: dossier.id
        });
    };

    console.log("dossqu", dossierQuery?.data)
    return (
        <View style={{margin: 10}}>
            <Card>
                <Card.Title>Dossier: {dossierQuery?.data?.name}</Card.Title>
                <Text>En cours: {dossierQuery?.data?.isCurrent}</Text>
                <Text>Date du: {dossierQuery?.data?.created_at}</Text>
                <Button title="Supprimer le dossier" onPress={onDeleteSubmit} />
                
            </Card>
        </View>
    )
}