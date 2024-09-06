import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import SettingsHeader from '../../Component/Header';
import { useRoute } from '@react-navigation/core';
import { COLORS } from '../../config/COLORS';

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLORS.DarkBlue,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: COLORS.DarkBlue,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: COLORS.DarkBlue,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: COLORS.DarkBlue,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: COLORS.DarkBlue,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: COLORS.DarkBlue
};

const TrackingScreen = () => {
  const route = useRoute();
  const { order } = route.params;

  // Default labels if location data is not available
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (order && order.message && Array.isArray(order.message.location)) {
      // Create labels from location data
      const locationLabels = order.message.location.map(loc => {
        return {
          label: loc.location,
          subLabel: new Date(loc.datetime).toLocaleString() // Format the datetime as needed
        };
      });

      // Update labels for StepIndicator
      setLabels(locationLabels);
    }
  }, [order]);

  const [currentPosition, setCurrentPosition] = useState(0);

  const onPageChange = (position) => {
    setCurrentPosition(position);
  };

  return (
    <View style={styles.container}>
      <SettingsHeader title={'Your Orders'} />
      <StepIndicator
        direction='vertical'
        customStyles={customStyles}
        currentPosition={currentPosition}
        stepCount={labels.length}
        labels={labels.map(loc => loc.label)} // Use only the main label for StepIndicator
      />
      {/* Optionally display sub-labels somewhere in your UI */}
      {labels.length > 0 && (
        <View style={styles.subLabelContainer}>
          {labels.map((loc, index) => (
            <View key={index} style={styles.subLabel}>
              <Text>{loc.label}</Text>
             
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
   alignSelf:'center'
    
  },
  subLabelContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    
  },
  subLabel: {
    marginBottom: 10,
  },
  subLabelText: {
    color: '#999999',
    fontSize: 12,
  },
});

export default TrackingScreen;
