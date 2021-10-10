import React, {useState} from 'react';
import SelectBox from 'react-native-multi-selectbox'
import { FAB, Card, Text, Button, Input } from "react-native-elements";
import { View } from 'react-native';
import { useObservers } from '../hooks/useObservers';
import { xorBy } from 'lodash';

type ObserverPartProps= {
    constatationId: string;
}

export function ObserverPart({  constatationId }: ObserverPartProps) {
    const ObserversQuery = useObservers();
    const [selectedObservers, setSelectedObservers] = useState([]);

    console.log("constatants", ObserversQuery?.data);

    const options = ObserversQuery?.data?.map( observer => ({item: observer?.lastName?.toUpperCase() + " " + observer?.firstName, id: observer.id}));

    console.log("selectedValues", selectedObservers);
    

    const onSubmit = async () => {
      
        console.log("values", selectedObservers);
        // await imageCreateMutation.mutateAsync({
        //   name: values.name,
        //   constatationId: constatationId,
        // });
        
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
            <Button onPress={() => onSubmit}/>
        </View>
    )

    function onMultiChange() {
        return (item) => setSelectedObservers(xorBy(selectedObservers, [item], 'id'))
    }
}