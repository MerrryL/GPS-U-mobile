import React, {useState} from "react";
import { Card, Switch, Icon, Button, Text, Input } from "react-native-elements";
import { format } from 'date-fns';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View } from "react-native";
import { useObservation } from "../../hooks/useObservation";
import { useUpdateObservation } from "../../hooks/useUpdateObservation";
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


type ObservationValues = {
  description: string;
};

const schema = yup.object().shape({
  description: yup.string().required(),
});

export function CardHeader({ observationId }) {
  const observationQuery = useObservation({
    observationId: observationId,
  });


  const  [observation, setObservation] = useState({description: observationQuery?.data?.description})

  const updateObservationMutation = useUpdateObservation();


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ObservationValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("here", values);
    await updateObservationMutation.mutateAsync({
      data: values,
      observationId: observationId,
    });
    //onSuccess();
  };
  return (
    <>     
      
    </>
  );
}
