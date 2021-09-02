import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { FAB } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";
import { useDossiers } from "../hooks/useDossiers";
import { DossierCard } from "../components/DossierCard";
import { SearchBar } from "@/features/constatations/components/SearchBar";

export default function ListDossiers() {
  const dossiersQuery = useDossiers({});
  const navigation = useNavigation();

  if (dossiersQuery.isLoading) {
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
        {dossiersQuery?.data?.map((dossier, index) => (
          <DossierCard dossier={dossier} key={index} />
        ))}
      </ScrollView>
      <FAB
        title="+"
        placement="right"
        size="large"
        onPress={() => navigation.navigate("Nouveau")}
      />
    </>
  );
}
