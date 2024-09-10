import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';
import { ROUTES } from '../../Routes';
import MainScreen from '../../Container/MainScreen';
import Settings from '../../Container/Setting';
import ICONS from '../../Images/Icon'; // Import the icons
import TrackListScreen from '../../Container/TrackList';
import { OrderTrackingTab } from '../../Container/OrderTrackingTab'; // Correct import

const Tab = createBottomTabNavigator();

const MainTab = ({ route }) => {
  const { token, email } = route.params || {}; 
  console.log('TOKENEMAIL MAINTAB', token, email);

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.MainScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === ROUTES.MainScreen) {
            iconName = ICONS.home;
          } else if (route.name === ROUTES.OrderTrackingTab) {
            iconName = ICONS.carttab;
          }
          return (
            <Image
              source={iconName}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#1679AB' : '#222',
              }}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === ROUTES.MainScreen) {
            label = 'Home';
          } else if (route.name === ROUTES.OrderTrackingTab) {
            label = 'Order';
          }
          return (
            <Text style={{ color: focused ? '#1679AB' : '#222' }}>{label}</Text>
          );
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={ROUTES.MainScreen}
        component={MainScreen}
        initialParams={{ token, email }}
      />
      <Tab.Screen
        name={ROUTES.OrderTrackingTab}
        component={OrderTrackingTab}
        initialParams={{ token, email }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
