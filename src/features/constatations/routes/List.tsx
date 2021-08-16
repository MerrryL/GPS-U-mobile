import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-elements";

import { ConstatationCard } from "../components/constatationCard";
import { SearchBar } from "../components/SearchBar";
import { useConstatations } from "../hooks/useConstatations";

export function List() {
  const constatationsQuery = useConstatations();

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
    </>
  );
}
