import React, { useState } from "react";
import { Card, Switch, Icon, Button, Text, Input } from "react-native-elements";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View } from "react-native";
import { useTask } from "../../hooks/useTask";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type TaskValues = {
  description: string;
};

const schema = yup.object().shape({
  description: yup.string().required(),
});

export function CardHeader({ taskId }) {
  const taskQuery = useTask({
    taskId: taskId,
  });

  const [task, setTask] = useState({
    description: taskQuery?.data?.description,
  });

  const updateTaskMutation = useUpdateTask();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("here", values);
    await updateTaskMutation.mutateAsync({
      data: values,
      taskId: taskId,
    });
    //onSuccess();
  };
  return <></>;
}
