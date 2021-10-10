import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { FAB } from "react-native-elements";

import { ConstatationCard } from "../components/List/ConstatationCard";
import { SearchBar } from "../components/SearchBar";
import { useConstatations } from "../hooks/useConstatations";
import { useNavigation } from "@react-navigation/native";
import { useCreateConstatation } from "../hooks/useCreateConstatation";

export default function List() {
  const constatationsQuery = useConstatations();
  const navigation = useNavigation();

  const createConstatationMutation = useCreateConstatation();

  const handleCreation = async (values) => {
    let newConstatation = await createConstatationMutation.mutateAsync({
      data: null,
    });

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
        // onPress={() => navigation.navigate("Nouvelle")}
        onPress={() => handleCreation(null)}
      />
    </>
  );
}
