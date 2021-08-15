// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { withSanctum } from "react-sanctum";

// import BottomNavigator from "../components/Layout/BottomNavigator";
// import ConstatationsScreen from "../features/constatations";
// import { useAuthState } from "../context";

// function GPSUNavigation() {
//   const userDetails = useAuthState();

//   console.log(userDetails);

//   return (
//     <NavigationContainer>
//       {!userDetails.token ? (
//         <>
//           <ConstatationsScreen />
//         </>
//       ) : (
//         <>
//           <BottomNavigator />
//         </>
//       )}
//     </NavigationContainer>
//   );
// }

// export default withSanctum(GPSUNavigation);
