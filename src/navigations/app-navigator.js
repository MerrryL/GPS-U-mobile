import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../scenes/home';
import AboutScreen from '../scenes/about';

const Stack= createBottomTabNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  )
}


export default AppNavigator;