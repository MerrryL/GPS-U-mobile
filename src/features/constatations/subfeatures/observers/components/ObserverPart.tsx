import React, {useState, useEffect} from 'react';
import SelectBox from 'react-native-multi-selectbox'
import { Card, Button } from "react-native-elements";
import { View } from 'react-native';
import { useObservers } from '../hooks/useObservers';
import { xorBy } from 'lodash';
import { useUpdateObserver } from '../hooks/useUpdateObservers';
import { useConstatation } from '@/features/constatations/hooks/useConstatation';

type ObserverPartProps= {
    constatationId: string;
}

export function ObserverPart({  constatationId }: ObserverPartProps) {
    const observersQuery = useConstatation({constatationId});
    const allObserversQuery= useObservers();
    const updateObserverMutation = useUpdateObserver({constatationId: constatationId, observers: null});

    const initialObservers = observersQuery?.data?.observers?.map( observer => ({item: observer?.lastName?.toUpperCase() + " " + observer?.firstName, id: observer.id}));
    
    const [selectedObservers, setSelectedObservers] = useState( []);

    // console.log("init observers", initialObservers, selectedObservers);
    // useEffect(() => setSelectedObservers(initialObservers), [initialObservers] ?? []);


    const options = allObserversQuery?.data?.map( observer => ({item: observer?.lastName?.toUpperCase() + " " + observer?.firstName, id: observer.id}));

    const onSubmit = async () => {
        let selectedObserversId = selectedObservers.map(function(item) { return item["id"]; }) ?? [];

        await updateObserverMutation.mutateAsync({
            constatationId: constatationId,
            observers: selectedObserversId,
        });
        
        //onSuccess();
    };

    return (
        <View style={{margin: 10}}>
            
            <Card>
            <SelectBox
                label="Select multiple"
                options={options}
                selectedValues={selectedObservers}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
            />
            </Card>
            <Button title="MAJ" onPress={() => onSubmit()}/>
        </View>
    )

    function onMultiChange() {
        return (item) => setSelectedObservers(xorBy(selectedObservers, [item], 'id'))
    }
}