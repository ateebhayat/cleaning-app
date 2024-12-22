import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/services/Home';
import { LoginScreen } from './screens/auth/SignIn';
import { Register } from './screens/auth/Register';
import { CreateService } from './screens/services/AddService';
import { NotFound } from './screens/NotFound';
import { Details } from './screens/services/Service-Details';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: 'black', // Set active tab text color to black
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Services',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='cleaning-services' size={24} color='black' />
          ),
        }}
      />
      <Tab.Screen
        name='Updates'
        component={CreateService}
        options={{
          title: 'Add Services',
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name='pluscircleo'
              size={size / 1.5} // Adjust the size of the plus icon as needed
              color='black'
              style={{
                marginTop: 4, // Space between the icons
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name='Home'
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFound}
        options={{ title: '404' }}
      />
      <Stack.Screen
        name='Details'
        component={Details} // Add Details screen to navigator
        options={{ title: 'Service Details' }} // Optional, can be customized
      />
    </Stack.Navigator>
  );
}
