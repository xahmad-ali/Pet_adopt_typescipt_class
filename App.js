import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Welcome } from './Screens/Welcome';
import { AdoptAnimal } from './Screens/AdoptAnimal';
import { DonateAnimal } from './Screens/DonateAnimal';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import { Profile } from './Screens/Profile';
import { UploadAnimalIamge } from './Screens/UploadAnimalIamge';
import { ChattingConcern } from './Screens/ChattingConcern';
import { Chatting } from './Screens/Chatting';
import { AllChats } from './Screens/AllChats';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MyTabs" component={MyTabs} />
      <Drawer.Screen name="AdoptAnimal" component={AdoptAnimal} />
      <Drawer.Screen name="DonateAnimal" component={DonateAnimal} />
      <Drawer.Screen name="AllChats" component={AllChats} />
    </Drawer.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <MaterialIcons name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <FontAwesome5 name="user" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: true }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="UploadAnimalIamge" component={UploadAnimalIamge} />
        <Stack.Screen name="ChattingConcern" component={ChattingConcern} />
        <Stack.Screen name="Chatting" component={Chatting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
