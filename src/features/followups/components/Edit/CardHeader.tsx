import React, {useState} from "react";
import { Card, Switch, Icon, Button, Text, Input } from "react-native-elements";
import { format } from 'date-fns';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View } from "react-native";
import { useFollowup } from "../../hooks/useFollowup";
import { useUpdateFollowup } from "../../hooks/useUpdateFollowup";
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


type FollowupValues = {
  description: string;
};

const schema = yup.object().shape({
  description: yup.string().required(),
});

export function CardHeader({ followupId }) {
  const followupQuery = useFollowup({
    followupId: followupId,
  });


  const  [followup, setFollowup] = useState({description: followupQuery?.data?.description})

  const updateFollowupMutation = useUpdateFollowup();


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FollowupValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("here", values);
    await updateFollowupMutation.mutateAsync({
      data: values,
      followupId: followupId,
    });
    //onSuccess();
  };
  return (
    <>     
      
    </>
  );
}
