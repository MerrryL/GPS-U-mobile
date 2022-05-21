import React from "react";
import { Button } from "react-native-elements";


function Home({ navigation }) {
  return (
    <>
      <Button title="Retour " onPress={() => navigation.goBack()} />
    </>
  );
}

export default Home;
