import React from "react";
import { Text, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { View } from "react-native";
import TextInput from "../TextInput";
import PickerInput from "@/components/Elements/Inputs/PickerInput";
import CheckBoxInput from "../CheckBoxInput";
import MultiPickerInput from "../MultiPickerInput";


type FormValues = {

}
//TODO:LATER
export default function FormBuilder(props){
    const { 
        inputs, 
        // "model": { 
        //     name,
        //     id = null
        // }, 
        // "parent": {
        //     name,
        //     id= null
        // },
    } = props;

    console.log("inputs", inputs);

    //const schema = inputs.map( input => input.schema);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
    //   resolver: yupResolver(schema),
    });

    function switchInputs( input, index ) {

        const inputProps= {...input, control:control, key:index };

        switch (input.type) {
            case "text":
                return <TextInput {...inputProps}/>
                break;
            case "picker":
                return <PickerInput {...inputProps}/>
                break;
            case "multi":
                return <MultiPickerInput {...inputProps}/>
                break;
            case "checkbox":
                return <CheckBoxInput {...inputProps}/>
            case "date":
                break;
            default:
                console.log("no input can be matched");
        }
    };

    const onSubmit = async (values) => {
        console.log("values", values);
  
        await modelCreateMutation.mutateAsync(values, model);
        

      };
  

    return (
        <View>
            { inputs?.map( (input, index) => (switchInputs(input, index)))}
           

        </View>
        

    );
}