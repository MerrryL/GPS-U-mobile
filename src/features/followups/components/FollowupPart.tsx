import React, {useState, useEffect} from 'react';
import SelectBox from 'react-native-multi-selectbox'
import { Card, Button } from "react-native-elements";
import { View } from 'react-native';
import { useFollowups } from '../hooks/useFollowups';
import { xorBy } from 'lodash';
import { useUpdateFollowup } from '../hooks/useUpdateFollowups';
import { useConstatation } from '@/features/constatations/hooks/useConstatation';
import { Followup } from '@/types';

type FollowupPartProps= {
    constatationId: string;
}

export function FollowupPart({  constatationId}: FollowupPartProps) {
    const useFollowupsQuery = useFollowups({constatationId});
    const updateFollowupMutation = useUpdateFollowup({constatationId: constatationId, observers: null}); 
    const [selectedFollowups, setSelectedFollowups] = useState( []);
    
    //console.log("init observers", initialFollowups, options);

    const onSubmit = async () => {
    
        await updateFollowupMutation.mutateAsync({
            constatationId: constatationId,
            // followups: selectedFollowups,
        });
        
        //onSuccess();
    };

    return (
        <View style={{margin: 10}}>
            
            <Card>
            
            </Card>
            <Button title="MAJ" onPress={() => onSubmit()}/>
        </View>
    )
}