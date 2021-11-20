import DateText from "@/components/Date/DateText";
import React from "react";
import { Text, makeStyles } from "react-native-elements";
import ConstatationRefusalButton from "../Buttons/ConstatationRefusalButton";
import ConstatationRequireValidationButton from "../Buttons/ConstatationRequireValidationButton";
import ConstatationValidationButton from "../Buttons/ConstatationValidationButton";

export default function ConstatationHasRequiredValidation(props) {
  const { id, requiresValidationDate = "Inconnue" } = props;

  const styles = useStyles();
  return (
    <>
      <DateText
        boldText="Validation possible depuis le"
        date={requiresValidationDate}
      />
      <ConstatationValidationButton id={id} />
      <ConstatationRefusalButton id={id} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  text: { flex: 0.5, height: "auto", marginBottom: 10 },
}));
