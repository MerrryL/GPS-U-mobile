import { Colors, Theme} from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import ConstatationHasRequiredValidation from "./ConstatationHasRequiredValidation";
import ConstatationIsDraft from "./ConstatationIsDraft";
import ConstatationIsValidated from "./ConstatationIsValidated";

export default function ConstatationValidationStatus(props) {
  const { id, is_validated, validation_date, requires_validation, requires_validation_date } = props;

  const styles = useStyles();
  return <View style={styles.container}>{is_validated == 1 ? <ConstatationIsValidated validation_date={validation_date} /> : requires_validation == 1 ? <ConstatationHasRequiredValidation id={id} requires_validation_date={requires_validation_date} /> : <ConstatationIsDraft id={id} />}</View>;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    marginRight: 8,
  },
  text: { flex: 0.5, height: "auto", marginBottom: 10 },
}));
