import React from 'react';
import { FAB, Card, Text, Button, Input } from "react-native-elements";
import { View } from 'react-native';
import { useDeleteDossier } from '../hooks/useDeleteDossier';
import { Dossier } from '../types';
import { useDossier } from '../hooks/useDossier';

type DossierCardProps= {
    dossier: Dossier;
    constatationId: string;
}

export function DossierCard({ dossier, constatationId }: DossierCardProps) {
    const DossierQuery = useDossier({ dossierId: dossier.id });
    const dossierDeleteMutation = useDeleteDossier({constatationId: constatationId, dossierId:dossier.id});

    const onDeleteSubmit = async () => {
        //todo: pause
        await dossierDeleteMutation.mutateAsync({
            constatationId: constatationId,
            dossierId: dossier.id
        });
    };
    return (
        <View style={{margin: 10}}>
            <Card>
                <Card.Title>{DossierQuery?.data?.name}</Card.Title>
                <Button title="Supprimer le champ" onPress={onDeleteSubmit} />
                
            </Card>
        </View>
    )
}