import React, { useState, useEffect } from "react";

import { Image, View, Platform } from "react-native";
import { Button } from "react-native-elements";

function Home({ navigation }) {
  return (
    <>
      <Button title="Retour " onPress={() => navigation.goBack()} />
    </>
  );
}

export default Home;
