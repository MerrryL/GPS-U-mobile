import DateText from "@/components/Elements/Text/DateText";
import React from "react";
import { FullTheme, makeStyles } from "react-native-elements";
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

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  text: { flex: 0.5, height: "auto", marginBottom: 10 },
}));
