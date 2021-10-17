import React, {useState, useEffect} from 'react';
import SelectBox from 'react-native-multi-selectbox'
import { Card, Button } from "react-native-elements";
import { View } from 'react-native';
import { useObservers } from '../hooks/useObservers';
import { xorBy } from 'lodash';
import { useUpdateObserver } from '../hooks/useUpdateObservers';
import { useConstatation } from '@/features/constatations/hooks/useConstatation';
import { Observer } from '@/types';

type ObserverPartProps= {
    constatationId: string;
    initialObservers: any;
    options: any;
}

export function ObserverPart({  constatationId, initialObservers = [], options = [] }: ObserverPartProps) {
    const updateObserverMutation = useUpdateObserver({constatationId: constatationId, observers: null}); 
    const [selectedObservers, setSelectedObservers] = useState( initialObservers);

    //useEffect(() => setSelectedObservers(initialObservers), [initialObservers]);

    //const options = allObserversQuery?.data?.map( observer => ({item: observer?.lastName?.toUpperCase() + " " + observer?.firstName, id: observer.id}));
    
    console.log("init observers", initialObservers, options);

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