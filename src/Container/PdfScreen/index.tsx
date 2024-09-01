import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ICONS from '../../Images/Icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '../../config/API';

const PdfScreen = () => {
  const route = useRoute();
  const {email, orderId, token} = route.params;
  const navigation = useNavigation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    console.log('Fetching data...');
    try {
      const response = await axios.get(API_URL + '/order/getOrderDetails', {
        params: {
          email: email,
          orderId: orderId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Response data:', response.data);
      setOrderDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Setting up interval to fetch data every 2 minutes');
    fetchData();

    const intervalId = setInterval(() => {
      console.log('Triggering fetchData via interval');
      fetchData();
    }, 110000);

    return () => {
      console.log('Clearing interval');
      clearInterval(intervalId);
    };
  }, [email, orderId, token]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.left} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.gifContainer}>
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}
        {orderDetails && (
          <View>
            <Text style={{color: 'red'}}>
              Email: {email}
              {orderDetails.userEmail}
            </Text>
            <Text style={{color: 'red'}}>
              Order ID: {orderId}
              {orderDetails.orderId}
            </Text>
          </View>
        )}
        <TouchableOpacity onPress={fetchData}>
          <Text style={{color: 'black'}}>Trigger API Call</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  icon: {
    tintColor: '#1679AB',
    height: 24,
    width: 24,
  },
  gifContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 100,
    height: 100,
  },
});

export default PdfScreen;
