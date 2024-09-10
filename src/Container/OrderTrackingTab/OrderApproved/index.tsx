import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config/API';
import { ROUTES } from '../../../Routes';
import { COLORS } from '../../../config/COLORS';

const OrderApproved = () => {
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedToken = await AsyncStorage.getItem('token');
        const retrievedEmail = await AsyncStorage.getItem('email');
        setToken(retrievedToken);
        setEmail(retrievedEmail);
        console.log('TOKEN ORDER APPROVED', retrievedToken);
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (token && email) {
      fetchOrderDetails();
    }
  }, [token, email]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const payload = { status: 'VERIFIED', email: email };
      const response = await axios.post(
        `${API_URL}/user/getOrderDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setOrders(response.data.message);
    } catch (error) {
      console.error('Error fetching order details:', error.response?.data || error.message);
      if (error.response?.data.message === 'You are Not Authorized') {
        setModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTrackPress = async (order) => {
    setCurrentOrder(order);
    try {
      const response = await axios.get(`${API_URL}/order/getTracking?id=${order.orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigation.navigate(ROUTES.TrackingScreen, { order: response.data });
    } catch (error) {
      console.error('Error fetching tracking info:', error.response?.data || error.message);
    }
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
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.DarkBlue} />
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.orderId}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No orders available</Text>}
          contentContainerStyle={orders.length === 0 ? styles.emptyListContainer : null}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {currentOrder?.status === 'VERIFIED' ? (
              <>
                <Text style={styles.modalText}>Please wait till the approval.</Text>
                <Text style={styles.modalSubText}>Your order is currently VERIFIED.</Text>
              </>
            ) : (
              <>
                <Text style={styles.modalText}>You are not Authorized.</Text>
                <Text style={styles.modalSubText}>Please Contact: 9751111444</Text>
              </>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalOpen(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
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
    margin: 16,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  modalText: {
    fontSize: 16,
    marginTop: 10,
    color: 'black',
  },
  modalSubText: {
    color: 'black',
    marginTop: 2,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: COLORS.DarkBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderApproved;
