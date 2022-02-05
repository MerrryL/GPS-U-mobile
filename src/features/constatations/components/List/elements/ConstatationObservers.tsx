import Title from "@/components/Elements/Text/Title";
import UserShort from "@/components/Elements/User/UserShort";
import { Observer } from "@/types";
import React from "react";
import { View } from "react-native";
import { makeStyles } from "react-native-elements";

type ConstatationObserversProps = {
  observers: Observer[];
};

//TODO : implement observers functionnality
//Create, add, delete, link

export default function ConstatationObservers(props: ConstatationObserversProps) {
  const { observers } = props;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Title title="Constatateurs" />

      {observers &&
        observers.map((observer: Observer, index) => {
          return <UserShort key={index} user={observer} />;
        })}
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {},
}));
