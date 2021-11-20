import React from "react";

import { Card } from "react-native-elements/dist/card/Card";

import { useCreateFollowup } from "../hooks/useCreateFollowup";

export default function Create() {
  const createFollowupMutation = useCreateFollowup();

  return <Card></Card>;
}
