import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/core';
import CustomStepIndicator from '../../Component/stepIndicator';
import SettingsHeader from '../../Component/Header';
import CustomButton from '../../Component/CustomButton';
import { COLORS } from '../../config/COLORS';
import axios from 'axios'; // Import axios for making API requests

const PaymentTracking = () => {
  const route = useRoute();
  const { order, token } = route.params || {};
  console.log(order, token, "PAYMENT TRACKING"); // Extract token from route params
  
  const [currentPosition, setCurrentPosition] = useState(0);
  const [stepDetails, setStepDetails] = useState([]);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchTrackingData = async () => {
         const url =`https://boypd4xnz3.execute-api.us-east-1.amazonaws.com/order/getTracking?id=${order.orderId}`
      try {
        const response = await axios.get(`https://boypd4xnz3.execute-api.us-east-1.amazonaws.com/order/getTracking?id=${order.orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        console.log(url,"URLqqq")
        console.log(response.data,"RESPONSE TRACKING")
        const data = response.data;
        const stepLabels = [];
        const details = [];
        let position = 0;
        console.log('responsepaymenttrack', response.data);
        
        if (data.message.orderConfirmed) {
          stepLabels.push('Order Confirmed');
          details.push([]);
          position = 0;
        }

        if (data.message.inTransit) {
          stepLabels.push('In Transit');
          details.push(
            data.message.location.map(
              loc => `Location: ${loc.location}, Time: ${new Date(loc.datetime).toLocaleString()}`
            )
          );
          position = 1;
        }

        if (data.message.shipped) {
          stepLabels.push('Shipped');
          details.push([]);
          position = 2;
        }

        if (data.message.delivered) {
          stepLabels.push('Delivered');
          details.push([]);
          position = 3;
        }

        setSteps(stepLabels);
        setStepDetails(details);
        setCurrentPosition(position);
      } catch (err) {
        console.error('Error fetching tracking data:', err.response ? err.response.data : err.message);
        setError('Failed to load tracking data.');
      } finally {
        setLoading(false);
      }
    };

    if (token && order) {
      fetchTrackingData();
    } else {
      setError('Invalid order or token.');
      setLoading(false);
    }
  }, [token, order]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.DarkBlue} />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SettingsHeader title={'Tracking'} />
      <CustomButton title={'Invoice'} onPress={() => console.log('Pressed')} bgColor={COLORS.DarkBlue} textColor={'white'} borderColor={COLORS.DarkBlue} />
      <CustomStepIndicator steps={steps} currentPosition={currentPosition} stepDetails={stepDetails} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 20,
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    fontSize: 16,
  },
});

export default PaymentTracking;
