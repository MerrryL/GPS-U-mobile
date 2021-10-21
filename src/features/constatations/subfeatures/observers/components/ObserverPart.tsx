import React, {useState, useEffect} from 'react';
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import SelectBox from 'react-native-multi-selectbox'
import { Card, Button } from "react-native-elements";
import { View, Text } from 'react-native';
import { xorBy } from 'lodash';
import { useUpdateObserver } from '../hooks/useUpdateObservers';

import { Observer } from '@/types';

type ObserverPartProps= {
    constatationId: string;
    initialObservers: any;
    options: any;
}

export function ObserverPart({  constatationId, initialObservers, options }: ObserverPartProps) {
    const updateObserverMutation = useUpdateObserver({constatationId: constatationId, observers: null}); 
    const [selectedObservers, setSelectedObservers] = useState( initialObservers);
    const [obsOptions, setOptions] = useState(options);

    useEffect(() => {
        //TODO:there musts be some bugs here due to bad initialization of options and initialObservers
        // console.log("options",options);
        // console.log("initialObservers", initialObservers);
        setSelectedObservers(initialObservers);
        setOptions(options);
    }, [options]);

    
    //console.log("init observers", initialObservers, options);

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
            <Text>Warning: the UI doesn't update correctly</Text>
            <Card>
            {
                typeof obsOptions != "undefined"  && typeof selectedObservers != "undefined" &&
                    <SelectBox
                    label="Select multiple"
                    options={obsOptions}
                    selectedValues={selectedObservers}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
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