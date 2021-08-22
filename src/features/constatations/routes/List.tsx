import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { FAB } from "react-native-elements";

import { ConstatationCard } from "../components/List/ConstatationCard";
import { SearchBar } from "../components/SearchBar";
import { useConstatations } from "../hooks/useConstatations";
import { useNavigation } from "@react-navigation/native";

export function List() {
  const constatationsQuery = useConstatations();
  const navigation = useNavigation();

  if (constatationsQuery.isLoading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  return (
    <>
      <SearchBar />
      <ScrollView>
        {constatationsQuery.data.map((constatation, index) => (
          <ConstatationCard constatation={constatation} key={index} />
        ))}
      </ScrollView>
      <FAB
        title="+"
        placement="right"
        size="large"
        onPress={() => navigation.navigate("Nouvelle")}
      />
    </>
  );
}
