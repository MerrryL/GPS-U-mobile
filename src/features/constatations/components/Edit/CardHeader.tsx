import React, {useState} from "react";
import { Card, Switch, Icon, Button, Text, Input } from "react-native-elements";
import { format } from 'date-fns';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View } from "react-native";
import { useConstatation } from "../../hooks/useConstatation";
import { useUpdateConstatation } from "../../hooks/useUpdateConstatation";
import imageURL from "../../utils/ImageURL";
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUnRequireValidationConstatation } from "../../hooks/useUnRequireValidationConstatation";
import { useRequireValidationConstatation } from "../../hooks/useRequireValidationConstatation";
import { useValidateConstatation } from "../../hooks/useValidateConstatation";

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

  const requireValidationMutation = useRequireValidationConstatation();
  const validateMutation = useValidateConstatation();
  const unRequireValidationMutation = useUnRequireValidationConstatation;


  const onValidationSubmit = async () => {
    await validateMutation.mutateAsync({
      constatationId: constatationId,
    });
  }
  const onRequireValidationSubmit = async () => {
    await requireValidationMutation.mutateAsync({
      constatationId: constatationId,
    });
  }

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
          source={imageURL({image: constatationQuery?.data})}
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
          {constatationQuery?.data?.isValidated == 1 ? (
            
            <Text style={{ flex: 0.5, height: "auto", marginBottom: 10 }}>
              Date de validation: {constatationQuery?.data?.validationDate}
            </Text>
            ) : (
            constatationQuery?.data?.requiresValidation ? (
              <>
                <Text style={{ flex: 0.5, height: "auto", marginBottom: 10 }}>
                  Validation possible depuis le
                  {constatationQuery?.data?.requiresValidationDate}
                </Text>
                <Button title="Valider " onPress={() => onValidationSubmit()} icon={<Ionicons name="checkmark-done" size={24} color="white" />} iconRight={true}  />

              </>
              
              
            ) : (
              <>
                <Text style={{ flex: 0.5, height: "auto", marginBottom: 10 }}>
                  Non soumis à approbation
                </Text>
                <Button title="Demander à valider " onPress={() => onRequireValidationSubmit()} icon={<Entypo name="check" size={24} color="white" />} iconRight={true}  />
              </>
            )
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
              value={constatation?.description ?? ""}
              placeholder="Description"
              multiline
              numberOfLines={4}
            />
          )}
          name="description"
          //defaultValue={}
        />
        <Text>{errors.description?.message}</Text>
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
