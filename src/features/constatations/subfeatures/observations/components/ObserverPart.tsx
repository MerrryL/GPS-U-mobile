import React, {useState, useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";
import SelectBox from 'react-native-multi-selectbox';
import { Card, Button } from "react-native-elements";
import { View, Text } from 'react-native';
import { xorBy } from 'lodash';
import { useUpdateConstatationObservations } from '../hooks/useUpdateConstatationObservations';

import { useConstatationObservations } from '../hooks/useConstatationObservations';
import { useObservations } from '../hooks/useObservations';
import MultiPickerInput from '@/components/Elements/Inputs/MultiPickerInput';

type ObservationPartProps= {
    constatationId: string;
}

type ObservationToSend = {
    id: string | number;
    item: string;
}

export function ObservationPart({  constatationId }: ObservationPartProps) {
    const updateObservationMutation = useUpdateConstatationObservations({constatationId: constatationId}); 

    const allObservationsQuery= useObservations();
    const options = allObservationsQuery?.data?.map( Observation => ({item: Observation?.lastName?.toUpperCase() + " " + Observation?.firstName, id: Observation.id}));

    const initialObservationsQuery = useConstatationObservations({constatationId});
    const initialObservations = initialObservationsQuery?.data?.map( Observation => ({item: Observation?.lastName?.toUpperCase() + " " + Observation?.firstName, id: Observation.id}));;

    const [selectedObservations, setSelectedObservations] = useState( initialObservations);
    const [obsOptions, setOptions] = useState(options);

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<any>();

    const onSubmit = async () => {
        let selectedObservationsId = selectedObservations.map((item: ObservationToSend) => item.id );

        await updateObservationMutation.mutateAsync({
            constatationId: constatationId,
            Observations: selectedObservationsId,
        });
    };

    return (
        <>
            <Card>
                <MultiPickerInput name="Observations" label="Observations" options={obsOptions} selectedValues={selectedObservations} control={control}/>
            </Card>
            <Button title="MAJ" onPress={() => onSubmit()}/>
        </>
    )

    function onMultiChange() {
        return (item) => setSelectedObservations(xorBy(selectedObservations, [item], 'id'))
    }
}