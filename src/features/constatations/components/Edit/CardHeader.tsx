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
import { useRefuseValidationConstatation } from "../../hooks/useRefuseValidationConstatation";
import { useRequireValidationConstatation } from "../../hooks/useRequireValidationConstatation";
import { useValidateConstatation } from "../../hooks/useValidateConstatation";
import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";
import TextInput from "@/components/Elements/Inputs/TextInput";

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


  const [constatation, setConstatation] = useState({description: constatationQuery?.data?.description})

  const updateConstatationMutation = useUpdateConstatation();

  const requireValidationMutation = useRequireValidationConstatation();
  const validateMutation = useValidateConstatation();
  const refuseValidationMutation = useRefuseValidationConstatation();


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

  const onRefuseValidationSubmit = async() => {
    await refuseValidationMutation.mutateAsync({
      constatationId:constatationId,
    })
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConstatationValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: ConstatationValues) => {
    await updateConstatationMutation.mutateAsync({
      data: values,
      constatationId: constatationId,
    });
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
            constatationQuery?.data?.requiresValidation == 1 ? (
              <>
                <Text style={{ flex: 0.5, height: "auto", marginBottom: 10 }}>
                  Validation possible depuis le
                  {constatationQuery?.data?.requiresValidationDate}
                </Text>
                <Button title="Valider " onPress={() => onValidationSubmit()} icon={<Ionicons name="thumbs-up" size={24} color="white" />} iconRight={true}  />
                <Button title="Refuser " onPress={() => onRefuseValidationSubmit()} icon={<Ionicons name="thumbs-down" size={24} color="white" />} iconRight={true}  />

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

        {/* <MultiPickerInput name="Observations" label="Observations" options={obsOptions} selectedValues={selectedObservations} control={control}/> */}

        <TextInput name="description" defaultValue={constatation?.description} label="Description" control={control} />
        
        <Button title="Enregistrer " onPress={handleSubmit(onSubmit)} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true}  />

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
