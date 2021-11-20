import React from "react";
import { useNavigation } from "@react-navigation/native";

import { FlatList, View } from "react-native";
import { Card, Button, Icon, Text, Input } from "react-native-elements";


import { useFollowup } from "../hooks/useFollowup";


type Params = {
  followupId: string;
};

type DetailsProps = {
  route: Route;
};

type Route = {
  params: Params;
};

export default function Details({ route }: DetailsProps) {
  const followupQuery = useFollowup({
    followupId: route.params.followupId,
  });

  const navigation = useNavigation();

  return (
    <Card>
      
    </Card>
  );
}
