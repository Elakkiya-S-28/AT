import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ROUTES } from '../../Routes';
import SettingsHeader from '../../Component/Header';
import { API_URL } from '../../config/API';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../config/COLORS';

const TrackListScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
   const {token,email}= route.params;
  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      // const email = await AsyncStorage.getItem('email');
      // const token = await AsyncStorage.getItem('token');
      console.log(token, email, "TOKEN<EMAAA")
      const payload = { status: 'IN-CART', email: email };
      console.log(email, token, "EMAIL AND TOKEN TRACKLIST");
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
      if(error.response.data.message === 'You are Not Authorized'){
        setModalOpen(true)
      }
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);
 
  // const handleTrackPress = (order) => {
  //   navigation.navigate(ROUTES.TrackingScreen, { order,token });
  // };


  const handleTrackPress = async (order) => {
    try {
      console.log(`Request URL: ${API_URL}/order/getTracking?id=${order.orderId}`);
      const response = await axios.get(`${API_URL}/order/getTracking?id=FL-00000034`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      console.log(response.data, "RESPONSE TRACING DATA");
      navigation.navigate(ROUTES.TrackingScreen, { order: response.data });
      
    } catch (error) {
      console.error('Error fetching tracking info:', error.response?.data || error.message);
      
    } finally {
      setLoading(false);
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
      <SettingsHeader title={'Your Orders'} />
      {loading ? (<View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color={COLORS.DarkBlue} />
      </View>) : (
        <FlatList
          data={orders}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.orderId}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No orders available</Text>}
          contentContainerStyle={orders.length === 0 ? styles.emptyListContainer : null} // Adjust container when no orders
          showsVerticalScrollIndicator={false} // Optional: Hide the scroll indicator for better UI
        />
      )}
  <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(!modalOpen)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You are not Authorized. </Text>
            <Text style={{color:'black', marginTop:2, marginBottom:10}}>Please Contact: 9751111444</Text>
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
    margin: 16
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
    shadowOffset: {width: 0, height: 2},
  },
  modalText: {
    fontSize: 16,
    marginTop:10,
    // marginBottom: 20,
    color: 'black',
  },
  modalButton: {
    backgroundColor:COLORS.DarkBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TrackListScreen;
