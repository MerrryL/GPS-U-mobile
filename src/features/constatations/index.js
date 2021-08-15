import React from "react";

import { ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { Text, SearchBar } from "react-native-elements";

import { useQuery } from "react-query";

import { getConstatations } from "./api/constatations";

import ConstatationList from "./components/molecules/constatationList";
import ConstatationDetails from "./components/molecules/constatationDetails";
import AddConstatation from "./components/atoms/addConstatation";

function ConstatationListViewer() {
  //function ConstatationListViewer({ navigation, route }) {
  const Stack = createStackNavigator();

  function Liste({ navigation }) {
    const { isLoading, isError, data, error } = useQuery(
      "constatations",
      getConstatations
    );

    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    if (isError) {
      return <Text>Error: {error.message}</Text>;
    }

    return (
      <>
        <SearchBar
          placeholder="Type Here..."
          // onChangeText={this.updateSearch}
          // value={search}
        />
        <ScrollView>
          <ConstatationList constatationList={data} navigation={navigation} />
        </ScrollView>

        <AddConstatation />
      </>
    );
  }

  function Details({ route, navigation }) {
    const constatation = route.params;

    return (
      <ConstatationDetails
        constatation={constatation}
        navigation={navigation}
      />
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Liste" component={Liste} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default ConstatationListViewer;
