import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View, Platform } from "react-native";

import { Card, Button, Icon, Text, Input } from "react-native-elements";
import { useCreateFollowup } from "../hooks/useCreateFollowUp";
import TextInput from "@/components/Elements/Inputs/TextInput";
import PickerInput from "@/components/Elements/Inputs/PickerInput";
import { useSupervisors } from "../hooks/useSupervisors";
import { useFollowupStatuses } from "../hooks/useFollowupStatuses";
import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";

type FollowupsValues = {
  name: string;
  description: string;
  followup_status_id: string;
  supervisors_id: string[];
};

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  followup_status_id: yup.string().required(),
  supervisors_id: yup.array().min(1).required(),
});

type FollowupAddProps = {
  observationId: string;
};

export function FollowupsAdd({ observationId }: FollowupAddProps) {
  const followupCreateMutation = useCreateFollowup({ observationId });

  const supervisorsQuery = useSupervisors();
  const supervisorsOptions = supervisorsQuery?.data?.map((supervisor) => ({
    item: supervisor?.lastName + " " + supervisor?.firstName,
    id: supervisor.id,
  }));

  const followupStatusesQuery = useFollowupStatuses();
  const followupStatusesOptions = followupStatusesQuery?.data?.map(
    (status) => ({ item: status.name, id: status.id })
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FollowupsValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("values", values);

    const { name, description, supervisors_id, followup_status_id } = values;

    await followupCreateMutation.mutateAsync({
      name: name,
      description: description,
      followup_status_id: followup_status_id,
      supervisors_id: supervisors_id,
      observationId: observationId,
    });

    //onSuccess();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        margin: "10px",
      }}
    >
      <TextInput name="name" defaultValue="" label="Nom" control={control} />
      <TextInput
        name="description"
        defaultValue=""
        label="Description"
        control={control}
      />
      <PickerInput
        name="followup_status_id"
        defaultValue="1"
        label="Etat"
        control={control}
        options={followupStatusesOptions}
      />
      <MultiPickerInput
        name="supervisors_id"
        label="Superviseurs"
        control={control}
        options={supervisorsOptions}
      />

      <Button title="Nouveau Suivi" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
