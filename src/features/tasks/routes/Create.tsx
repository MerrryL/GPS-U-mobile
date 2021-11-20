import React from "react";

import { Card } from "react-native-elements/dist/card/Card";

import { useCreateTask } from "../hooks/useCreateTask";

export default function Create() {
  const createTaskMutation = useCreateTask();

  return <Card></Card>;
}
