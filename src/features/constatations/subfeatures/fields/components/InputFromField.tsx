import React from "react";
import NormalText from "@/components/Elements/Text/NormalText";
import { Field } from "@/types";
import TextInput from "@/components/Elements/Inputs/TextInput";
import { useController } from "react-hook-form";
import PickerInput from "@/components/Elements/Inputs/PickerInput";
import CheckBoxInput from "@/components/Elements/Inputs/CheckBoxInput";
import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";

type InputFromFieldProps ={
    f: Field;
    control: any;

};

// name: 
// type: 
// orderedUuid: 
// options: 
// isRequired: 
// field_group_id: 
// field_group: 
// pivot: 
// id:

export default function InputFromField(props:InputFromFieldProps) {
    const { f, control } = props;



    console.log("Field", f);

    
    

    if(['text', 'password', 'email'].includes(f.type.value)) {
        return (
            <TextInput
                name={f.id}
                label={f.name}
                defaultValue={f.defaultValue}
                control={control}
            />
        )
    }

    // if(f.type.value = 'date'){
    //     return (
    //         <DatePicker 
            
    //         />
    //     )
    // }

    if (f.type.value === 'select') {
        return (
            <PickerInput
                name={f.id}
                label={f.name}
                defaultValue={f.defaultValue}
                control={control}
                options={f.options}
            />
        )
    }

    if (f.type.value === 'multi-select') {
        return (
            <MultiPickerInput
                name={f.id}
                label={f.name}
                defaultValue={f.defaultValue}
                control={control}
                options={f.options}
                selectedValues={f.pivot.value}
            />
        )
    }

    if (f.type.value === 'checkbox') {
        return (
            <CheckBoxInput 
                name={f.id}
                label={f.name}
                defaultValue={f.defaultValue}
                control={control}
            />
        )
    }

    // if (f.type.value === 'radio') {
    //     return (
    //     )
    // }

    


    return null;
};



