import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import {ROUTES} from '../../Routes';
import {useTimer} from '../../Context/TimerContext';
import {COLORS} from '../../config/COLORS';
import SettingsHeader from '../../Component/Header';

const Checkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {token, items, totalQuantity, totalItems, totalPrice, category, email,products} =
    route.params;
  const {remainingTime, setRemainingTime} = useTimer();

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setRemainingTime]);

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <SettingsHeader title="Summary" />
      
      <View style={styles.centerContainer}>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>Fabric</Text>
        
            <Text style={styles.timeTexts}>{totalItems} items</Text>
    
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>ORDER NUMBER</Text>
            {category === 'yarn' ? (
              <Text style={styles.value}>YA {items[0].orderId}</Text>
            ) : (
              <Text style={styles.value}>FA {items[0].orderId}</Text>
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>QUANTITIES</Text>
            <Text style={styles.value}>{totalQuantity}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>TOTAL PRICE</Text>
            <Text style={styles.value}>{totalPrice}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>BOOKING STATUS</Text>
            <View style={styles.bookedContainer}>
              <Text style={styles.bookedText}>Booked</Text>
            </View>
          </View>

        

          <TouchableOpacity
            style={styles.payButton}
            onPress={() =>
              navigation.navigate(ROUTES.Payment, {
                token,
                items,
                totalPrice,
                totalQuantity,
                category,
                email,
              })
            }>
            <Text style={styles.payText}>PAY AMOUNT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(remainingTime)} left</Text>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#EEF7FF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '90%', // Adjust width as needed
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  itemCount: {
    fontSize: 16,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  bookedContainer: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bookedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  timeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: COLORS.DarkBlue,
    borderRadius: 5,
    padding: 10,
    marginTop:10,

  },
  payButton: {
    backgroundColor: COLORS.DarkBlue,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    width:'50%',
    alignSelf:'center'
  },
  payText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timeTexts: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor:COLORS.DarkBlue,
    borderRadius: 5,
    padding: 5,
  },
});

export default Checkout;
