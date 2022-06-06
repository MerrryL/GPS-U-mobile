import DateText from "@/components/Elements/Text/DateText";
import { Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";

export default function ConstatationIsValidated(props) {
  const { validationDate } = props;

  const styles = useStyles();

  return <DateText boldText="Date de validation" date={validationDate} />;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  text: { flex: 0.5, height: "auto", marginBottom: 10 },
}));
