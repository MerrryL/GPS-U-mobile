import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { FAB } from "react-native-elements";

import { ObservationCard } from "../components/List/ObservationCard";
import { useObservations } from "../hooks/useObservations";
import { useNavigation } from "@react-navigation/native";
import { useCreateObservation } from "../hooks/useCreateObservation";

export default function List() {
  const observationsQuery = useObservations();
  const navigation = useNavigation();

  const createObservationMutation = useCreateObservation();

  const handleCreation = async (values) => {
    let newObservation = await createObservationMutation.mutateAsync({
      data: null,
    });

    navigation.navigate("Edition", {
      observationId: newObservation?.id,
    });
    //onSuccess();
  };

  if (observationsQuery.isLoading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  return (
    <>
      <ScrollView>
        {observationsQuery.data.map((observation, index) => (
          <ObservationCard observation={observation} key={index} />
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
