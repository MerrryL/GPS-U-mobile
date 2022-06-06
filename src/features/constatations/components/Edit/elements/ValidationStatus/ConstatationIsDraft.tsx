import { Colors, Text, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
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

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  text: { flex: 0.5, height: "auto", marginBottom: 10 },
}));
