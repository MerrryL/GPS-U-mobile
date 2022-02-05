import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View, Platform } from "react-native";

import { Card, Button, Icon, Text, Input, Switch } from "react-native-elements";
import { useCreateTask } from "../hooks/useCreateTask";
import SwitchInput from "@/components/Elements/Inputs/CheckBoxInput";
import TextInput from "@/components/Elements/Inputs/TextInput";
import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";
import { useOperators } from "../hooks/useOperators";
import { useTaskStatuses } from "../hooks/usetASKStatuses";
import PickerInput from "@/components/Elements/Inputs/PickerInput";

type TasksValues = {
  name: string;
  description: string;
  realisation_date: string;
  report_date: string;
  report_periodicity: string;
  task_status_id: string;
  isDefault: boolean;
  operators_id: string[];
};

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  realisation_date: yup.string().required(),
  report_date: yup.string().required(),
  report_periodicity: yup.string().required(),
  task_status_id: yup.string().required(),
  operators_id: yup.array().min(1).required(),
});

type TasksAddProps = {
  followupId: string;
  observationId: string;
};

export function TaskAdd({ followupId, observationId }: TasksAddProps) {
  const taskCreateMutation = useCreateTask({ observationId, followupId });

  const operatorsQuery = useOperators();
  const operatorsOptions = operatorsQuery?.data?.map((operator) => ({
    item: operator?.lastName + " " + operator?.firstName,
    id: operator.id,
  }));

  const taskStatusesQuery = useTaskStatuses();
  const taskStatusesOptions = taskStatusesQuery?.data?.map((status) => ({
    item: status.name,
    id: status.id,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TasksValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("values", values);

    const {
      name,
      description,
      realisation_date,
      report_date,
      report_periodicity,
      task_status_id,
      operators_id,
    } = values;

    await taskCreateMutation.mutateAsync({
      name,
      description,
      realisation_date,
      report_date,
      report_periodicity,
      task_status_id,
      operators_id,
      observationId,
      followupId,
    });
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
      <TextInput
        name="realisation_date"
        defaultValue=""
        label="Date de réalisation"
        control={control}
      />
      <TextInput
        name="report_date"
        defaultValue=""
        label="Date butoir"
        control={control}
      />
      <TextInput
        name="report_periodicity"
        defaultValue=""
        label="Périodicité"
        control={control}
      />
      <PickerInput
        name="task_status_id"
        defaultValue=""
        label="Type"
        control={control}
        options={taskStatusesOptions}
      />
      <MultiPickerInput
        name="operators_id"
        label="Opérateurs"
        control={control}
        options={operatorsOptions}
      />

      <Button title="Nouvelle tâche" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
