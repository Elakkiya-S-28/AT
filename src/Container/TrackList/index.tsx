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
      <FlatList
        data={orders}
        renderItem={renderTrackItem}
        keyExtractor={(item) => item.orderId}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No orders available</Text>}
        contentContainerStyle={orders.length === 0 ? styles.emptyListContainer : null} // Adjust container when no orders
        showsVerticalScrollIndicator={false} // Optional: Hide the scroll indicator for better UI
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 5,
    margin:16
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
    fontWeight: '600',
  },
  trackAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontWeight: '400',
  },
  emptyMessage: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default TrackListScreen;
