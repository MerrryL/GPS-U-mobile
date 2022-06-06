import DateText from "@/components/Elements/Text/DateText";
import { Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import ConstatationRefusalButton from "../Buttons/ConstatationRefusalButton";
import ConstatationValidationButton from "../Buttons/ConstatationValidationButton";

interface ConstatationHasRequiredValidationPropsType {
  id: number;
  requiresValidationDate?: string;
}
export default function ConstatationHasRequiredValidation({ id, requiresValidationDate = "Inconnue" }: ConstatationHasRequiredValidationPropsType) {
  const styles = useStyles();
  return (
    <>
      <DateText boldText="Validation possible depuis le" date={requiresValidationDate} />
      <ConstatationValidationButton id={id} />
      <ConstatationRefusalButton id={id} />
    </>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  text: { flex: 0.5, height: "auto", marginBottom: 10 },
}));
