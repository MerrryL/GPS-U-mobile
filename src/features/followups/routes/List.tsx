import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { FAB } from "react-native-elements";

import { FollowupCard } from "../components/List/FollowupCard";
import { useFollowups } from "../hooks/useFollowups";
import { useNavigation } from "@react-navigation/native";
import { useCreateFollowup } from "../hooks/useCreateFollowup";

export default function List() {
  const followupsQuery = useFollowups();
  const navigation = useNavigation();

  const createFollowupMutation = useCreateFollowup();

  const handleCreation = async (values) => {
    let newFollowup = await createFollowupMutation.mutateAsync({
      data: null,
    });

    navigation.navigate("Edition", {
      followupId: newFollowup?.id,
    });
    //onSuccess();
  };

  if (followupsQuery.isLoading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  console.log("suivis", followupsQuery?.data);

  return (
    <>
      <ScrollView>
        {followupsQuery?.data?.map((followup, index) => (
          <FollowupCard followup={followup} key={index} />
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
