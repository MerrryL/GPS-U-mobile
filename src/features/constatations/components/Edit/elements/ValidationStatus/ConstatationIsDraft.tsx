import React from "react";
import { FullTheme, makeStyles, Text } from "react-native-elements";
import ConstatationRequireValidationButton from "../Buttons/ConstatationRequireValidationButton";

export default function ConstatationIsDraft(props) {
  const { id } = props;

  const styles = useStyles();
  return (
    <>
      <Text boldText="Non soumis à approbation"></Text>
      <ConstatationRequireValidationButton id={id} />
    </>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  text: { flex: 0.5, height: "auto", marginBottom: 10 },
}));
