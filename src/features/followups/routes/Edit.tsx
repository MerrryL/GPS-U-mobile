import React, { useState } from "react";

import { Button, Text, Input } from "react-native-elements";

import { ScrollView, View } from "react-native";
import { Card } from "react-native-elements";

type Params = {
  followupId: string;
};

type EditProps = {
  route: Route;
};

type Route = {
  params: Params;
};

export default function Edit({ route }: EditProps) {
  const followupId = route.params.followupId;
  

  return (
    <ScrollView>

    </ScrollView>
  );
}
