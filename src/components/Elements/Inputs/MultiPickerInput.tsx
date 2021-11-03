// import React, { useState } from "react";
// import { Picker } from "@react-native-picker/picker";
// import { Text, Input } from "react-native-elements";
// import { format } from "date-fns";
// import { useForm, Controller, useController } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// export default function PickerInput({
//   name,
//   label,
//   defaultValue,
//   control,
//   options,
// }) {
//   const { field, fieldState, formState } = useController({
//     control,
//     name,
//     defaultValue: defaultValue,
//   });

//   return (
//     <>
//       <Text>{label}</Text>
//       <Picker {...field}>
//         {options?.map((option) => {
//           return (
//             <Picker.Item
//               label={option.item}
//               value={option.id}
//               key={option.id}
//             />
//           );
//         })}
//       </Picker>
//       {/* <Text>{formState.isDirty ? "modifié" : "pas modifié"}</Text> */}
//       {/* <Text>{fieldState?.errors[name]?.message}</Text> */}
//     </>
//   );
// }
