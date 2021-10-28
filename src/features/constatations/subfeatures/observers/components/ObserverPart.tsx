import React, {useState, useEffect} from 'react';
import SelectBox from 'react-native-multi-selectbox';
import { Card, Button } from "react-native-elements";
import { View, Text } from 'react-native';
import { xorBy } from 'lodash';
import { useUpdateConstatationObservers } from '../hooks/useUpdateConstatationObservers';

import { useConstatationObservers } from '../hooks/useConstatationObservers';
import { useObservers } from '../hooks/useObservers';

type ObserverPartProps= {
    constatationId: string;
    initialObservers: any;
    options: any;
}

type ObserverToSend = {
    id: string | number;
    item: string;
}

export function ObserverPart({  constatationId }: ObserverPartProps) {
    const updateObserverMutation = useUpdateConstatationObservers({constatationId: constatationId}); 

    const allObserversQuery= useObservers();
    const options = allObserversQuery?.data?.map( observer => ({item: observer?.lastName?.toUpperCase() + " " + observer?.firstName, id: observer.id}));

    const initialObserversQuery = useConstatationObservers({constatationId});
    const initialObservers = initialObserversQuery?.data?.map( observer => ({item: observer?.lastName?.toUpperCase() + " " + observer?.firstName, id: observer.id}));;

    const [selectedObservers, setSelectedObservers] = useState( initialObservers);
    const [obsOptions, setOptions] = useState(options);


    const onSubmit = async () => {
        let selectedObserversId = selectedObservers.map((item: ObserverToSend) => item.id );

        await updateObserverMutation.mutateAsync({
            constatationId: constatationId,
            observers: selectedObserversId,
        });
    };

    return (
        <View style={{margin: 10}}>
            <Card>
            {
                typeof obsOptions != "undefined"  && typeof selectedObservers != "undefined" &&
                    <SelectBox
                    label="Choix des observateurs"
                    options={obsOptions}
                    selectedValues={selectedObservers}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
                    listEmptyText="Pas de résultats"
                    isMulti
                />
            }
            
            </Card>
            <Button title="MAJ" onPress={() => onSubmit()}/>
        </View>
    )

    function onMultiChange() {
        return (item) => setSelectedObservers(xorBy(selectedObservers, [item], 'id'))
    }
}