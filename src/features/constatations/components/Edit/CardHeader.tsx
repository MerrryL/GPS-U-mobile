import React, {useState} from "react";
import { Card, Switch, Icon, Button, Text, Input } from "react-native-elements";
import { format } from 'date-fns';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useConstatation } from "../../hooks/useConstatation";
import { useUpdateConstatation } from "../../hooks/useUpdateConstatation";
import imageURL from "../../utils/ImageURL";
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

type ConstatationValues = {
  description: string;
};

const schema = yup.object().shape({
  description: yup.string().required(),
});

export function CardHeader({ constatationId }) {
  const constatationQuery = useConstatation({
    constatationId: constatationId,
  });

  const  [constatation, setConstatation] = useState({description: constatationQuery?.data?.description})

  const updateConstatationMutation = useUpdateConstatation();




  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConstatationValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("here", values);
    await updateConstatationMutation.mutateAsync({
      data: values,
      constatationId: constatationId,
    });
    //onSuccess();
  };
  return (
    <>     
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
            uri: imageURL({image: constatationQuery?.data})
          }}
          resizeMode="cover"
          style={{ width: 200, height: 200 }}
        />
        <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          height: "auto",
          padding: 10,
          width: "60%",
        }}
        >
          {constatationQuery?.data?.isValidated ? (
            constatationQuery?.data?.requiresValidation ? (
              <Text style={{ flex: 0.5, height: "auto", marginBottom: 10 }}>
                Validation possible depuis le
                {constatationQuery?.data?.requiresValidationDate}
              </Text>
              
            ) : (
              <Text style={{ flex: 0.5, height: "auto", marginBottom: 10 }}>
                Non soumis à approbation
              </Text>
            )
          ) : (
            <Text style={{ flex: 0.5, height: "auto", marginBottom: 10 }}>
              Date de validation: {constatationQuery?.data?.validationDate}
            </Text>
          )}
        </View>
      </View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={constatation?.description}
              placeholder="Description"
              multiline
              numberOfLines={4}
            />
          )}
          name="description"
          //defaultValue={}
        />
        <Text>{errors.comment?.message}</Text>
        <Button title="Enregistrer " onPress={() => handleSubmit(onSubmit)} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true}  />

      </View>
      <View
        style={{
          flex: 1,
          flexDirection:'row',
          alignItems: "flex-end",
        }}
      >
        <Text style={{ flex: 0.5, marginBottom: 10 }}>
          Création: {constatationQuery?.data?.created_at}
        </Text>
        <Text style={{ flex: 0.5, marginBottom: 10 }}>
          Dernière modification: {constatationQuery?.data?.updated_at}
        </Text>
      </View>

      <Card.Divider />
    </>
  );
}
