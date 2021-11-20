import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { FAB } from "react-native-elements";

import { TaskCard } from "../components/List/TaskCard";
import { useTasks } from "../hooks/useTasks";
import { useNavigation } from "@react-navigation/native";
import { useCreateTask } from "../hooks/useCreateTask";

export default function List(props) {
  const { navigation, route } = props;
  const tasksQuery = useTasks();

  const createTaskMutation = useCreateTask();

  const handleCreation = async (values) => {
    let newTask = await createTaskMutation.mutateAsync({
      data: null,
    });

    navigation.navigate("Edition", {
      taskId: newTask?.id,
    });
    //onSuccess();
  };

  if (tasksQuery.isLoading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  console.log("taches", tasksQuery?.data);

  return (
    <>
      <ScrollView>
        {tasksQuery?.data?.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </ScrollView>
      <FAB
        title="+"
        placement="right"
        size="large"
        // onPress={() => navigation.navigate("Nouvelle")}
        onPress={() => handleCreation(null)}
      />
    </>
  );
}
