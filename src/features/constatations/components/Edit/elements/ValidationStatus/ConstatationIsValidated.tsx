import DateText from "@/components/Date/DateText";
import React from "react";
import { Text, makeStyles } from "react-native-elements";

export default function ConstatationIsValidated(props) {
  const { validationDate } = props;

  const styles = useStyles();

  return <DateText boldText="Date de validation" date={validationDate} />;
}

const useStyles = makeStyles((theme) => ({
  text: { flex: 0.5, height: "auto", marginBottom: 10 },
}));
