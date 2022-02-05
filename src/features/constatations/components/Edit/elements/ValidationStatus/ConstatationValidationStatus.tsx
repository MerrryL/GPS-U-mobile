import React from "react";
import { View } from "react-native";
import { makeStyles } from "react-native-elements";
import ConstatationHasRequiredValidation from "./ConstatationHasRequiredValidation";
import ConstatationIsDraft from "./ConstatationIsDraft";
import ConstatationIsValidated from "./ConstatationIsValidated";

export default function ConstatationValidationStatus(props) {
  const { id, isValidated, validationDate, requiresValidation, requiresValidationDate } = props;

  const styles = useStyles();
  return <View style={styles.container}>{isValidated == 1 ? <ConstatationIsValidated validationDate={validationDate} /> : requiresValidation == 1 ? <ConstatationHasRequiredValidation id={id} requiresValidationDate={requiresValidationDate} /> : <ConstatationIsDraft id={id} />}</View>;
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {},
  text: { flex: 0.5, height: "auto", marginBottom: 10 },
}));
