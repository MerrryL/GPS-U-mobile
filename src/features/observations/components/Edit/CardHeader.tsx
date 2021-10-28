import React, {useState} from "react";
import SelectBox from 'react-native-multi-selectbox';
import { Card, Switch, Icon, Button, Text, Input } from "react-native-elements";
import { format } from 'date-fns';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import { View } from "react-native";
import { useObservation } from "../../hooks/useObservation";
import { useUpdateObservation } from "../../hooks/useUpdateObservation";
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCodexes } from "../../hooks/useCodexes";


type ObservationValues = {
  description: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
});

export function CardHeader({ observationId }) {
  const observationQuery = useObservation({
    observationId: observationId,
  });
  const codexQuery = useCodexes();
  const options = codexQuery?.data?.map( observer => ({item: observer?.name, id: observer.id}));
  const [selectedOption, setSelectedOption] = useState({});

  const  [observation, setObservation] = useState( observationQuery?.data);

  const updateObservationMutation = useUpdateObservation();

  console.log("observation", observation);

  console.log("codexes", options);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ObservationValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values, selectedOption) => {
    console.log("here", values, selectedOption);
    // await updateObservationMutation.mutateAsync({
    //   data: values,
    //   observationId: observationId,
    // });
    //onSuccess();
  };
  return (
    <>
      {
        typeof options !== "undefined"   &&
            <SelectBox
            label="Choix du codex"
            options={options}
            value={selectedOption}
            onChange={onChange()}
            listEmptyText="Pas de résultats"
        />
      }
    
      <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              defaultValue={observation?.name}
              placeholder="Nom"
            />
          )}
          name="name"
        />
        <Text>{errors.name?.message}</Text>
        <Button title="Enregistrer " onPress={handleSubmit(onSubmit)} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true}  />

      
    </>
  );

  function onChange() {
    return (val) => {
      console.log("value", val);
      setSelectedOption(val);
      console.log("wtf", selectedOption);
    }
  }
}
