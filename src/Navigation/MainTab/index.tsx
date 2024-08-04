import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';
import { ROUTES } from '../../Routes';
import MainScreen from '../../Container/MainScreen';
import Settings from '../../Container/Setting';
import ICONS from '../../Images/Icon'; // Import the icons

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.MainScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === ROUTES.MainScreen) {
            iconName = ICONS.home;
          } else if (route.name === ROUTES.Settings) {
            iconName = ICONS.profile;
          }
          return <Image source={iconName} style={{ width: 23, height: 25, tintColor: focused ? '#1679AB' : '#222' }} />;
        },
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === ROUTES.MainScreen) {
            label = 'Home';
          } else if (route.name === ROUTES.Settings) {
            label = 'Profile';
          }
          return <Text style={{ color: focused ? '#1679AB' : '#222' }}>{label}</Text>;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name={ROUTES.MainScreen} component={MainScreen} />
      <Tab.Screen name={ROUTES.Settings} component={Settings} />
    </Tab.Navigator>
  );
};

export default MainTab;
