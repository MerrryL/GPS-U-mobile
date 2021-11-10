import React, {useState, useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";
import SelectBox from 'react-native-multi-selectbox';
import { Card, Button } from "react-native-elements";
import { View, Text } from 'react-native';
import { xorBy } from 'lodash';
import { useUpdateConstatationObservers } from '../hooks/useUpdateConstatationObservers';

import { useConstatationObservers } from '../hooks/useConstatationObservers';
import { useObservers } from '../../../../../hooks/useObservers';
import MultiPickerInput from '@/components/Elements/Inputs/MultiPickerInput';

type ObserverPartProps= {
    constatationId: string;
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

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<any>();

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
            <MultiPickerInput name="observers" label="observers" options={obsOptions} selectedValues={selectedObservers} control={control}/>
            
            </Card>
            <Button title="MAJ" onPress={() => onSubmit()}/>
        </View>
    )

    function onMultiChange() {
        return (item) => setSelectedObservers(xorBy(selectedObservers, [item], 'id'))
    }
}