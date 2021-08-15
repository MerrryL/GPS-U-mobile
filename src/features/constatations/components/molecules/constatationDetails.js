import React from "react";

import { FlatList, View } from "react-native";
import {
  Card,
  Button,
  Icon,
  ThemeProvider,
  Text,
  Input
} from "react-native-elements";

import { useForm, Controller } from "react-hook-form";

export default function ConstatationDetails({ constatation, navigation }) {
  const {
    control,
    handleSubmit
    //formState: { errors }
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // console.log("in details");
  // console.log(constatation.field_groups);

  const FieldGroup = ({ field_group }) => {
    const group = field_group.item;

    // console.log("in Item");
    // console.log(group);
    // console.log(Object.keys(group.constatation_field_values).length);

    return (
      <View>
        <Text>
          Groupe: {group.name} - {group.type}
        </Text>
        {group.constatation_field_values &&
          Object.keys(group.constatation_field_values).length > 0 && (
            <ValueList values={group.constatation_field_values} />
          )}
      </View>
    );
  };

  const ValueList = ({ values }) => {
    const list = values.map((value) => <Field key={value.id} field={value} />);

    /*console.log("in valueList");
        console.log(values);*/

    return <View>{list}</View>;
  };

  const Field = ({ field }) => {
    // console.log("in field");
    // console.log(field);

    return (
      <>
        <Text>{field.field_type.name}</Text>
        <Controller
          control={control}
          rules={{
            maxLength: 100
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onBlur={onBlur} onChangeText={onChange} value={value} />
          )}
          name={field.orderedUuid}
          defaultValue={field.value}
        />
      </>
    );
  };

  return (
    <ThemeProvider>
      <Card>
        <Card.Title>Constatation n°{constatation.id}</Card.Title>
        <Card.Divider />
        <Card.Image
          source="https://picsum.photos/200/300"
          resizeMode="cover"
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ marginBottom: 10 }}>{constatation.comment}</Text>
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="VIEW NOW"
          onPress={() => navigation.navigate("Details", constatation)}
        />

        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>{constatation.isValidated}</Text>
        <Text style={{ marginBottom: 10 }}>{constatation.validationDate}</Text>
        <Text style={{ marginBottom: 10 }}>
          {constatation.requiresValidation}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {constatation.requiresValidationDate}
        </Text>
        <Text style={{ marginBottom: 10 }}>{constatation.created_at}</Text>
        <Text style={{ marginBottom: 10 }}>{constatation.updated_at}</Text>

        <Card.Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <FlatList
            data={constatation.field_groups}
            renderItem={(field_group) => (
              <FieldGroup field_group={field_group} />
            )}
            keyExtractor={(field_group) => field_group.id.toString()}
          />
          <input type="submit" />
        </form>
      </Card>
    </ThemeProvider>
  );
}
