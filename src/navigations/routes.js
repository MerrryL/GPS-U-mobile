import HomeScreen from "../scenes/home";
import UserScreen from "../scenes/user";
import ConstatationsScreen from "../scenes/constatationListViewer";
import ParametersScreen from "../scenes/parameters";
import AboutScreen from "../scenes/about";
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
