import { Constatation } from "@/types";
import { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FAB, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { UseMutationResult, UseQueryResult } from "react-query";
import { ConstatationStackParamList } from "..";
import { ConstatationListCard } from "../components/List/ConstatationListCard";
import { SearchBar } from "../components/SearchBar";
import { useConstatations } from "../hooks/useConstatations";
import { useCreateConstatation } from "../hooks/useCreateConstatation";

type ConstatationListProps = {
  navigation: StackNavigationProp<ConstatationStackParamList, "Liste">;
  route: RouteProp<ConstatationStackParamList, "Liste">;
};

export default function List({ route, navigation }: ConstatationListProps):JSX.Element {
  const constatationsQuery: UseQueryResult<Constatation[], unknown> = useConstatations();

  const createConstatationMutation: UseMutationResult<Constatation, unknown, void, any> = useCreateConstatation();

  const handleCreation:()=>Promise<void> = async ():Promise<void> => {
    const newConstatation:Constatation = await createConstatationMutation.mutateAsync();

    navigation.navigate("Edition", {
      constatationId: newConstatation?.id,
    });
    //onSuccess();
  };

  if (constatationsQuery.isLoading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }
  //TODO: handle case where the list is empty

  return (
    <>
      <SearchBar />
      <ScrollView>
        {constatationsQuery?.data?.map((constatation: Constatation, index: number):JSX.Element => (
          <ConstatationListCard constatation={constatation} key={index} />
        ))}
      </ScrollView>
      <FAB title="+" placement="right" size="large" onPress={():Promise<void> => handleCreation()} />
    </>
  );
}
