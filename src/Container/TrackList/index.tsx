import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../Routes';
import SettingsHeader from '../../Component/Header';
import { API_URL } from '../../config/API';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrackListScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  const fetchOrderDetails = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const token = await AsyncStorage.getItem('token');
      const payload = { status: 'IN-CART', email: email };

      const response = await axios.post(
        API_URL + '/user/getOrderDetails',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      setOrders(response.data.message);
    } catch (error) {
      console.error(
        'Error fetching order details:',
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const handleTrackPress = (order) => {
    navigation.navigate(ROUTES.TrackingScreen, { order });
  };

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => handleTrackPress(item)}
    >
      {/* <Image
        source={{ uri: 'https://via.placeholder.com/80' }} // Replace with your image URL
        style={styles.trackImage}
      /> */}
      <View style={styles.trackContent}>
        <Text style={styles.trackName}>{item.category}</Text>
        <Text style={styles.trackDate}>Date: {new Date(item.createdOn).toLocaleDateString()}</Text>
        <Text style={styles.trackAddress}>Order ID: {item.orderId}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SettingsHeader title={'Your Orders'} />
      <View style={{ margin: 16 }}>
        <FlatList
          data={orders}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.orderId}
          // Optional: Add debug props
          ListEmptyComponent={<Text style={{ alignSelf: 'center', justifyContent: 'center', fontSize: 18, color: 'black' }}>No orders available</Text>} // Show a message if there are no orders
          contentContainerStyle={{ flexGrow: 1 }}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    elevation: 1, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 5
  },
  trackImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  trackContent: {
    flex: 1,
  },
  trackName: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trackDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600'
  },
  trackAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontWeight: '400'
  },
  headerContainer: {
    backgroundColor: '#1679AB',
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TrackListScreen;
