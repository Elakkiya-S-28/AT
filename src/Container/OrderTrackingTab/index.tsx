import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, BackHandler } from 'react-native';
import { TabView, SceneMap, Route, TabBar } from 'react-native-tab-view';
import OrderQueued from './OrderQueued';
import OrderApproved from './OrderApproved';
import { COLORS } from '../../config/COLORS';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SettingsHeader from '../../Component/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type State = { index: number; routes: Route[] };

const renderScene = SceneMap({
  first: () => <OrderQueued />,
  second: () => <OrderApproved />,
});

export const OrderTrackingTab = () => {
  const [index, setIndex] = useState<State['index']>(0);
  const [routes] = useState<State['routes']>([
    { key: 'first', title: 'Queued' },
    { key: 'second', title: 'Approved' },
  ]);

  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const retrievedToken = await AsyncStorage.getItem('token');
      const retrievedEmail = await AsyncStorage.getItem('email');
      setToken(retrievedToken);
      setEmail(retrievedEmail);
      console.log('ordertrackingtab', retrievedToken, retrievedEmail);
    };
    fetchData();
  }, []);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: COLORS.DarkBlue }}
      style={{ backgroundColor: '#F0F3FF' }}
      renderLabel={({ route, focused }) => (
        <Text style={[styles.label, focused ? styles.activeLabel : styles.label]}>
          {route.title}
        </Text>
      )}
    />
  );

  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MainTab'); // Replace 'MainTab' with the name of your tab or screen
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsHeader title={'Your Orders'} />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'gray',
    fontWeight: '400',
    fontSize: 16,
  },
  activeLabel: {
    color: COLORS.DarkBlue,
    fontWeight: '400',
    fontSize: 16,
  },
});
