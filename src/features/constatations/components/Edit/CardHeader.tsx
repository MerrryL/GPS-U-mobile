import React from "react";
import { Card, Switch, Icon, Button, Text, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View } from "react-native";
import thumbURL from "../../utils/ThumbURL";
import { useNavigation } from "@react-navigation/native";
import { useConstatation } from "../../hooks/useConstatation";
import { useUpdateConstatation } from "../../hooks/useUpdateConstatation";

type ConstatationValues = {
  comment: string;
};

const schema = yup.object().shape({
  comment: yup.string().required(),
});

export function CardHeader({ constatationId }) {
  const constatationQuery = useConstatation({
    constatationId: constatationId,
  });

  const updateConstatationMutation = useUpdateConstatation();

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
      constatationId: constatationId,
    });
    navigation.goBack();
    //onSuccess();
  };
  return (
    <>
      <Card.Title>Constatation n°{constatationQuery?.data?.id}</Card.Title>
      <Card.Divider />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          height: "auto",
          borderBottomWidth: 1,
          padding: 10,
        }}
      >
        {constatationQuery?.data?.isValidated ? (
          constatationQuery?.data?.requiresValidation ? (
            <Text style={{ flex: 1, height: "auto", marginBottom: 10 }}>
              Validation possible depuis le
              {constatationQuery?.data?.requiresValidationDate}
            </Text>
          ) : (
            <Text style={{ flex: 1, height: "auto", marginBottom: 10 }}>
              Non soumis à approbation
            </Text>
          )
        ) : (
          <Text style={{ flex: 1, height: "auto", marginBottom: 10 }}>
            Date de validation: {constatationQuery?.data?.validationDate}
          </Text>
        )}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
        }}
      >
        <Text style={{ flex: 1, marginBottom: 10 }}>
          Création: {constatationQuery?.data?.created_at}
        </Text>
        <Text style={{ flex: 1, marginBottom: 10 }}>
          Dernière mise à jour: {constatationQuery?.data?.updated_at}
        </Text>
      </View>
      <Card.Divider />
      <View
        style={{
          flexDirection: "row",
          height: "auto",
          borderBottomWidth: 1,
          padding: 10,
        }}
      >
        <Card.Image
          source={{
            uri: thumbURL({ image: constatationQuery?.data?.images[0] }),
          }}
          resizeMode="cover"
          style={{ width: 200, height: 200 }}
        />
        <View
          style={{
            flex: 1,
            width: "60%",
          }}
        >
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
                placeholder="commentaires"
                multiline
                numberOfLines={4}
              />
            )}
            name="comment"
            defaultValue={constatationQuery?.data?.comment}
          />
          <Text>{errors.comment?.message}</Text>
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>

      <Card.Divider />
    </>
  );
}
