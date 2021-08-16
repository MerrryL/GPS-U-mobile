import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { Button, Text, Input } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import { FlatList, View } from "react-native";
import { Card, Icon } from "react-native-elements";

import thumbURL from "../utils/ThumbURL";

import { FieldGroup } from "../components/Details/FieldGroup";
import { useConstatation } from "../hooks/useConstatation";
import { useUpdateConstatation } from "../hooks/useUpdateConstatation";

const schema = yup.object().shape({
  comment: yup.string().required(),
});

type ConstatationValues = {
  comment: string;
};

type Params = {
  constatationId: string;
};

type EditProps = {
  route: Route;
};

type Route = {
  params: Params;
};

export function Edit({ route }: EditProps) {
  const constatationQuery = useConstatation({
    constatationId: route.params.constatationId,
  });
  const updateConstatationMutation = useUpdateConstatation();

  console.log("query", constatationQuery?.data);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConstatationValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    await updateConstatationMutation.mutateAsync({
      data: values,
      constatationId: route.params.constatationId,
    });
    navigation.goBack();
    //onSuccess();
  };

  return (
    <Card>
      <Card.Title>Constatation n°{constatationQuery?.data?.id}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={{
          uri: thumbURL({ image: constatationQuery?.data?.images[0] }),
        }}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            leftIcon={<Icon name="user" size={24} color="black" />}
            placeholder="commentaires"
          />
        )}
        name="comment"
        defaultValue={constatationQuery?.data?.comment}
      />
      <Text>{errors.comment?.message}</Text>

      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>
        {constatationQuery?.data?.isValidated}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {constatationQuery?.data?.validationDate}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {constatationQuery?.data?.requiresValidation}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {constatationQuery?.data?.requiresValidationDate}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {constatationQuery?.data?.created_at}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {constatationQuery?.data?.updated_at}
      </Text>

      <Card.Divider />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

      <FlatList
        data={constatationQuery?.data?.field_groups}
        renderItem={(field_group) => <FieldGroup field_group={field_group} />}
        keyExtractor={(field_group) => field_group?.id.toString()}
      />
    </Card>
  );
}
