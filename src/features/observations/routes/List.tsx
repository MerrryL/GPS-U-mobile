import { Observation } from "@/types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "@rneui/base";
import { FAB, useTheme } from "@rneui/themed";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ObservationStackParamList } from ".";
import { ObservationListCard } from "../components/List/ObservationCard";
import { useCreateObservation } from "../hooks/useCreateObservation";
import { useObservations } from "../hooks/useObservations";

interface ObservationListProps {
  navigation: StackNavigationProp<ObservationStackParamList, "Liste">;
  route: RouteProp<ObservationStackParamList, "Liste">;
}

export default function List({ route, navigation }: ObservationListProps) {
  const observationsQuery = useObservations();
  const { theme } = useTheme();

  const createObservationMutation = useCreateObservation();

  const handleCreation = async () => {
    const newObservation: Observation = await createObservationMutation.mutateAsync();
  };

  if (observationsQuery.isLoading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }
  //TODO: handle case where the list is empty

  return (
    <>
      <ScrollView>
        {observationsQuery?.data?.map((observation, index) => (
          <ObservationListCard observation={observation} key={index} />
        ))}
      </ScrollView>
      <FAB title="+" placement="right" color={theme.colors.success} size="large" onPress={() => handleCreation()} />
    </>
  );
}
