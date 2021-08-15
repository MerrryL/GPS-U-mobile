import HomeScreen from "../features/home";
import UserScreen from "../features/user";
import ConstatationsScreen from "../features/constatations";
import ParametersScreen from "../features/parameters";
import AboutScreen from "../features/about";
//import NotFound from '../scenes/notFound';

const routes = [
  {
    screen: HomeScreen,
    label: "Page d'acceuil",
    name: "Page d'acceuil",
    icon: "home",
    isPrivate: false
  },
  {
    screen: ConstatationsScreen,
    label: "Liste des constatations",
    name: "Liste des constatations",
    icon: "newspaper-outline",
    isPrivate: false
  },
  {
    screen: UserScreen,
    label: "User",
    name: "User",
    icon: "people-outline",
    isPrivate: false
  },
  {
    screen: ParametersScreen,
    label: "Paramètres",
    name: "Paramètres",
    icon: "settings",
    isPrivate: true
  },
  {
    screen: AboutScreen,
    label: "About the Creators",
    name: "About the Creators",
    icon: "home",
    isPrivate: false
  }
];

export default routes;

/*
{ routes.filter( route => route.isPrivate === false ).map((route) => (   
          <Tab.Screen
        name={route.name}
        component={route.screen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={route.icon} color={color} size={size} />
          ),
        }} />

        */
