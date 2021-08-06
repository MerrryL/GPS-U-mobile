import React from "react";

import { View } from "react-native";
import { Button } from "react-native-elements";

function Home({ navigation }) {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Constatations"
          onPress={() => navigation.navigate("Constatations")}
        />

        <Button title="Retour " onPress={() => navigation.goBack()} />
      </View>
    </>
  );
}

export default Home;
