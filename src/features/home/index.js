import { Button } from "@rneui/base";
import React from "react";


function Home({ navigation }) {
  return (
    <>
      <Button title="Retour " onPress={() => navigation.goBack()} />
    </>
  );
}

export default Home;
