import DateText from "@/components/Elements/Text/DateText";
import { Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import ConstatationRefusalButton from "../Buttons/ConstatationRefusalButton";
import ConstatationValidationButton from "../Buttons/ConstatationValidationButton";

interface ConstatationHasRequiredValidationPropsType {
  id: number;
  requires_validation_date?: string;
}
export default function ConstatationHasRequiredValidation({ id, requires_validation_date = "Inconnue" }: ConstatationHasRequiredValidationPropsType) {
  const styles = useStyles();
  return (
    <>
      <DateText boldText="Validation possible depuis le" date={requires_validation_date} />
      <ConstatationValidationButton id={id} />
      <ConstatationRefusalButton id={id} />
    </>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  text: { flex: 0.5, height: "auto", marginBottom: 10 },
}));
