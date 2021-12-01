import React from "react";
import { Text, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { View } from "react-native";

import InputSelector from "./InputSelector";
import { InputedField } from "@/types/utilityTypes";
import { AnyObjectSchema } from "yup";
import Lazy from "yup/lib/Lazy";
import NormalText from "../Text/NormalText";
import { Button } from "react-native-elements";

import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { string } from "yup/lib/locale";

type FieldGroup = {
    title: string;
    description:string;
    fields:InputedField[];
};

type FormBuilderProps = {
    title:string;
    description:string;
    fields:InputedField[];
    fieldGroups: FieldGroup[];
    onSubmit: any;
    schema: any;
};

type FormValues = any;


//TODO:LATER
export default function FormBuilder(props:FormBuilderProps ){
    const {
        title,
        description,
        fields,
        fieldGroups,
        onSubmit,
        schema
    } = props;


    // const defaultValues = fields?.map( field => {return {field.name: field?.defaultValue}) || {};
    // const schemas = fields.map( field => field.schema);

    // console.log("fields",  yup.object().shape(schemas));


    
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        // resolver: yupResolver(yup.object().shape(schemas)),.
        resolver: yupResolver(schema),

    });

    // fields.forEach(field => {
    //     setValue(field.name, field.value);
    // });

    const renderFields = ({title, description, fields}:FieldGroup ) => {
        return (
            <View>
                <NormalText boldText={title} text={description}/>
                { fields &&fields?.map( (field:InputedField, index: React.Key) => (
                    <InputSelector f={field} key={index} control={control}/>
                ))}
            </View>

        )
    }

  

    return (
        <View>
            { fields && renderFields({title, description, fields})}

            { fieldGroups && fieldGroups.map( (group) => renderFields({title: group.title, description: group.description, fields: group.fields})) }

            



           <Button title="Enregistrer " onPress={handleSubmit(onSubmit)} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true}  />
        </View>
        

    );
}