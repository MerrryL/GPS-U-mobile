import React from "react";
import { useNavigation } from "@react-navigation/native";

import { FlatList, View } from "react-native";
import { Card, Button, Icon, Text, Input } from "react-native-elements";


import { useTask } from "../hooks/useTask";


type Params = {
  taskId: string;
};

type DetailsProps = {
  route: Route;
};

type Route = {
  params: Params;
};

export default function Details({ route }: DetailsProps) {
  const taskQuery = useTask({
    taskId: route.params.taskId,
  });

  const navigation = useNavigation();

  return (
    <Card>
      
    </Card>
  );
}
