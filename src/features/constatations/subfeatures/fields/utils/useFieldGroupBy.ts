import { Field, FieldGroup } from "@/types";
import _ from "lodash";

export default function mapFieldsToFieldForms(
  fields: Field[]
): { fieldGroup: FieldGroup; fields: Field[] }[] {
  const splittedFields = _.groupBy(fields, "field_group_id");

  const groupedFields = Object.entries(splittedFields).map(([key, value]) => {
    return {
      fieldGroup: value[0].field_group as FieldGroup,
      fields: value as Field[],
    };
  });

  return groupedFields;
}
